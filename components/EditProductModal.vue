<template>
  <div>
    <b-modal
      :id="infoModal.id"
      title="Color to be updated"
      ok-title-html="close"
      hide-footer
    >
      <pre>{{ product }}</pre>

      <b-card class="mt-3" header="Update the color">
        <div v-if="showAlert">
          <div class="alert alert-success" role="alert">Color updated!</div>
        </div>

        <div>
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label="New Bg color:"
              label-for="input-1"
              description="Example: #FFFFFF"
            >
              <b-form-input
                id="input-1"
                v-model="updateItem.bg_color"
                type="text"
                placeholder="Enter bg color"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="new Text color:"
              label-for="input-1"
              description="Example: #04ff00"
            >
              <b-form-input
                id="input-1"
                v-model="updateItem.text_color"
                type="text"
                placeholder="Enter text color"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-checkbox
              v-model="updateItem.checked"
              name="isActive"
              switch
            >
              Active
            </b-form-checkbox>
            <div class="d-flex flex-row-reverse mt-4">
              <b-button type="submit" variant="dark">Update</b-button>
            </div>
          </b-form>
        </div>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
import { updateCalendar } from "../service/api";
export default {
  props: ["infoModal", "product", "token"],
  emits: ["refresha-list"],
  data() {
    return {
      updateItem: {
        bg_color: "",
        text_color: "",
        checked: false,
      },
      showAlert: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.showAlert = true;
      updateCalendar(
        this.product.id,
        this.token,
        JSON.parse(JSON.stringify(this.updateItem))
      );
      setTimeout(() => {
        this.closeModal();
      }, 1500);
    },
    closeModal() {
      this.$bvModal.hide(this.infoModal.id);
      this.$emit("refresha-list");
      this.showAlert = false;
    },
  },
};
</script>

<style>
</style>