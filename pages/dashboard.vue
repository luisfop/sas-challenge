<template>
  <div>
    <h2 class="title">Dashboard</h2>
    <div v-if="!error">
      <b-table
        id="my-table"
        responsive
        hover
        :items="data"
        :fields="fields"
        stacked="md"
        show-empty
        small
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template v-slot:cell(options)="data">
          <b-button
            size="sm"
            variant="dark"
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
      <b-pagination
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <div v-if="showAlert">
        <div class="alert alert-danger mt-4" role="alert">
          Product removed with succes
        </div>
      </div>

      <edit-product-modal
        :infoModal="infoModal"
        :product="product"
        :token="token"
        @refresha-list="refresh"
      />

      <div class="d-flex justify-content-end mt-4">
        <b-button v-b-toggle.collapse-1 variant="outline-dark"
          >Create new palette color</b-button
        >
      </div>
      <b-collapse id="collapse-1">
        <create-product @refresh-list="refresh" :data="this.data" />
      </b-collapse>
    </div>
    <div v-else>
      <p>Error getting data</p>
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
      },
      product: {},
      token: "",
      showAlert: false,
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
      nextPageLink: "",
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
    },

    refresh() {
      (async () => {
        console.log("CLICKED");
        const response = await getCalendar(this.token);
        console.log("RESPONSE DO REFRESH ->>>", response);
        this.data = response.data.data.entities;
      })();
    },

    handleModal(id, index, button) {
      this.product = id;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
  },

  created() {
    this.token = getUserToken();
    (async () => {
      const response = await getCalendar(this.token);
      console.log("RESPONSEEEEEEE ->", response);
      if (response.status != 200) {
        this.$router.push("/");
      } else {
        this.data = response.data.data.entities;
        this.currentPage = response.data.data.pagination.current_page;
        this.totalRows = response.data.data.pagination.total;
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
