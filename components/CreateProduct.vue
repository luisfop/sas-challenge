<template>
  <b-card class="mt-3" header="Create custom Calendar">
    <div v-if="showAlert">
      <div class="alert alert-success" role="alert">
        Product added with succes
      </div>
    </div>

    <div>
      <p class="h4">Please, create your own Calendar</p>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Bg color:"
          label-for="input-1"
          description="Example: #FFFFFF"
        >
          <b-form-input
            id="input-1"
            v-model="form.bg_color"
            type="text"
            placeholder="Enter bg color"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="text color:"
          label-for="input-1"
          description="Example: #04ff00"
        >
          <b-form-input
            id="input-1"
            v-model="form.text_color"
            type="text"
            placeholder="Enter text color"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-checkbox v-model="form.checked" name="isActive" switch>
          Active
        </b-form-checkbox>
        <div class="d-flex flex-row-reverse mt-4">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </b-form>
    </div>
  </b-card>
</template>

<script>
import { createNewCalendar } from "~/service/api";

export default {
  data() {
    return {
      form: {
        bg_color: "",
        text_color: "",
        checked: false,
      },
    };
  },
  props: ["showAlert"],

  middleware: "auth",
  mounted() {
    console.log("ERROR ->", this.error);
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      createNewCalendar(JSON.parse(JSON.stringify(this.form)));
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    },
  },
};
</script>