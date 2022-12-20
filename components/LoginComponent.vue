<template>
  <div>
    <b-container fluid="sm">
      <b-form @submit="onSubmit">
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-email"
          description="example@eg.com"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Enter your password"
            required
            type="password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$axios.post(
          `${this.$axios.defaults.baseURL}/login_json`,
          {
            login: {
              email: this.form.email,
              password: this.form.password,
            },
          }
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: this.form.email,
            token: response.data.data.result.access_token,
          })
        );
        this.$router.push("/dashboard");
      } catch (e) {
        // TODO: ERROR
        console.log("Error login in", e);
      }
    },

    onSubmit(event) {
      event.preventDefault();
      this.login();
    },
  },
};
</script>