<template>
  <div>
    <h2 class="title">Dashboard</h2>
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
            size="sm"
            class="mr-2"
            @click="handleModal(data.item, data.index, $event.target)"
            ><b-icon-pencil></b-icon-pencil
          ></b-button>
          <b-button
            variant="warning"
            size="sm"
            @click="deletar(data.item.id, token)"
          >
            <b-icon-trash></b-icon-trash>
          </b-button>
        </template>
      </b-table>
      <div v-if="showAlert">
        <div class="alert alert-danger" role="alert">
          Product removed with succes
        </div>
      </div>

      <edit-product-modal
        :infoModal="infoModal"
        :product="product"
        :token="token"
      />

      <div class="d-flex justify-content-end mt-4">
        <b-button v-b-toggle.collapse-1 class="btn__newCal"
          >Create new Calendar</b-button
        >
      </div>
      <b-collapse id="collapse-1">
        <create-product />
      </b-collapse>
    </div>
    <div v-else>
      <p>Erro getting data</p>
    </div>
  </div>
</template>

<script>
import { BIconTrash, BIconPencil } from "bootstrap-vue";
import { getCalendar, getUserToken, deleteCalendar } from "../service/api";
import EditProductModal from "~/components/EditProductModal.vue";

export default {
  name: "IndexPage",
  middleware: "auth",
  components: { BIconTrash, BIconPencil, EditProductModal },
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
      product: {},
      token: "",
      showAlert: false,
    };
  },
  methods: {
    deletar(id, token) {
      let deletedData = this.data.filter((y) => y.id !== id);
      this.data = deletedData;
      deleteCalendar(id, token);
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2500);
      (async () => {
        const response = await getCalendar(this.token);
        this.data = response.data.data.entities;
      })();
    },

    handleModal(id, index, button) {
      this.product = id;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
  },

  mounted() {
    this.token = getUserToken();
    (async () => {
      const response = await getCalendar(this.token);
      console.log("RESPONSE ->", response);
      if (response.status !== 200) {
        this.$router.push("/");
      } else {
        this.data = response.data.data.entities;
      }
    })();
  },
};
</script>

<style lang="scss">
.btn {
  &__newCal {
    background: #c7ddcc;
    border: none;
    color: black;
  }
}

.title {
  color: #c7ddcc;
}
</style>
