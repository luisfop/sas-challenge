<template>
  <div>
    <b-modal :id="infoModal.id" title="Update" ok-only>
      <pre>{{ product }}</pre>
      <!-- <pre>{{ infoModal }}</pre> -->
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["infoModal", "product"],

  data() {
    return {
      updateItem: {
        bg_color: "",
        text_color: "",
        checked: false,
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("yeaeea");
    },
  },

  mounted() {},
};
</script>

<style>
</style>