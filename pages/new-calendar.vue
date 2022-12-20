<template>
  <b-card class="mt-3" header="Create custom Calendar">
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
          Switch Checkbox <b>(Checked: {{ form.checked }})</b>
        </b-form-checkbox>
        <div class="d-flex flex-row-reverse mt-4">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>

        <!-- <b-card class="mt-3" header="Create new calendar data">
          <pre class="m-0">{{ form }}</pre>
        </b-card> -->
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
      errors: [],
    };
  },
  middleware: "auth",
  mounted() {
    console.log("MOUNTED");
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      //TODO : conditional errors
      createNewCalendar(JSON.parse(JSON.stringify(this.form)));
      // alert(JSON.stringify(this.form));
    },
  },
};
</script>