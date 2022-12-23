<template>
  <div class="overflow-auto">
    <b-button @click="nextPage">next</b-button>

    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <p class="mt-3">Rows: {{ rows }}</p>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perPage: 3,
      currentPage: 1,
      items: [
        { id: 1, first_name: "Fred", last_name: "Flintstone" },
        { id: 2, first_name: "Wilma", last_name: "Flintstone" },
        { id: 3, first_name: "Barney", last_name: "Rubble" },
        { id: 4, first_name: "Betty", last_name: "Rubble" },
        { id: 5, first_name: "Pebbles", last_name: "Flintstone" },
        { id: 6, first_name: "Bamm Bamm", last_name: "Rubble" },
        { id: 7, first_name: "The Great", last_name: "Gazzoo" },
        { id: 8, first_name: "Rockhead", last_name: "Slate" },
        { id: 9, first_name: "Pearl", last_name: "Slaghoople" },
      ],
    };
  },
  computed: {
    rows() {
      return this.items.length;
    },
  },

  methods: {
    nextPage() {
        this.currentPage = this.currentPage++
      (async () => {
        let response = await this.$axios.get(`https://sys-dev.searchandstay.com/api/admin?=page=${this.currentPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("RESPONSE DO API.JS ->", response);
        return response;
      })();
    },
  },
};
</script>