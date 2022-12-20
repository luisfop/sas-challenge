<template>
  <b-container fluid class="footer-pad">
    <b-row class="h-60" align-h="center" align-v="center">
      <b-col sm="12" lg="4">
        <div class="mb-2">
          <h1 class="text-center text-monospace">Login</h1>
        </div>
        <login-component />
      </b-col>
    </b-row>
  </b-container>
</template>
<style scoped>
.h-60 {
  height: 60vh;
}
</style>
<script>
import LoginComponent from "~/components/LoginComponent.vue";
export default {
  components: { LoginComponent },
};
</script>