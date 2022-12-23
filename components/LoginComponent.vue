<template>
  <div>
    <b-container fluid="sm" class="login__card">
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
            :state="validation"
            required
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">
            Must be a valid email '@'!
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
            Perfect! :)
          </b-form-valid-feedback>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            placeholder="Enter your password"
            required
            type="password"
          ></b-form-input>
          <b-form-invalid-feedback :state="validatePassword">
            Password must be at least 8 char!
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validatePassword">
            Looks Good :)
          </b-form-valid-feedback>
          <b-alert v-model="showAlert" variant="danger" class="mt-4" dismissible>
            Ops, something's wrong!
          </b-alert>
        </b-form-group>

        <b-button type="submit" variant="dark">Login</b-button>
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
      showAlert: false,
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
        return { error: true, msg: `Ops, something's wrong` };
      }
    },

    async onSubmit(event) {
      event.preventDefault();
      let response = await this.login();

      if (response.error) {
        this.showAlert = true;
      }
    },
  },
  computed: {
    validation() {
      return this.form.email.includes("@");
    },
    validatePassword() {
      return this.form.password.length >= 8;
    },
  },
};
</script>

<style lang="scss">
.login__card {
  border: solid;
  padding: 2rem;
  border-radius: 1rem;
}
</style>