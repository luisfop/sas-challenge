<template>
  <b-card class="mt-3" header="Create custom Palette">
    <b-alert v-model="showAlert" class="alert alert-success" role="alert">
      Product added with succes
    </b-alert>

    <div>
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Background color:"
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
          label="Text color:"
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
          <b-button type="submit" variant="dark">Submit</b-button>
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
      showAlert: false,
    };
  },
  props: ["data"],

  middleware: "auth",
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      let response = await createNewCalendar(
        JSON.parse(JSON.stringify(this.form))
      );
      if (response.status != 200) {
        this.$router.push("/");
      } else {
        this.data.push(response.data.data);
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
          (this.form.bg_color = ""),
            (this.form.text_color = ""),
            (this.checked = false);
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
</style>