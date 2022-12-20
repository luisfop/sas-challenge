<template>
  <div>
    <h1>Index page!</h1>

    <div v-if="!error">
      <b-table
        responsive
        hover
        :items="data"
        :fields="fields"
        stacked="md"
        show-empty
        small
      >
        <template v-slot:cell(options)="data">
          <b-button
            variant="primary"
            size="sm"
            class="mr-2"
            @click="editar(data.item.id, data.index, $event.target)"
            >Editar</b-button
          >
          <b-button variant="danger" size="sm" @click="deletar(data.item.id, token)"
            >Remover</b-button
          >
        </template>
      </b-table>
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only>
        <pre>{{ infoModal.content }}</pre>
      </b-modal>
    </div>
    <div v-else>
      <p>Erro ao pegar os dados</p>
    </div>
  </div>
</template>

<script>
import { BIconTrash, BIconPencil } from "bootstrap-vue";
import { getCalendar, getUserToken, deleteCalendar } from "../service/api";

export default {
  name: "IndexPage",
  middleware: "auth",
  components: { BIconTrash, BIconPencil },
  data() {
    return {
      data: [],
      error: false,
      fields: ["id", "bg_color", "text_color", "active", "order", "options"],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      token: '',
    };
  },
  methods: {
    deletar(id, token) {
      let deletedData = this.data.filter((y) => y.id !== id);
      this.data = deletedData;
      deleteCalendar(id, token);
    },

    editar(id, index, button) {
      // console.log("This is DATA ID ->", id);
      // console.log("This is DATA ID ->", index);

      this.infoModal.title = `Row index: ${index}`;
      // this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
  },

  mounted() {
     this.token = getUserToken();
    (async () => {
      const response = await getCalendar(this.token);
      console.log('RESPONSE ->', response)
      if (response.status !== 200 ) {
        this.$router.push("/");
      } else {
        this.data = response.data.data.entities;
      }
    })();
  },
};
</script>
