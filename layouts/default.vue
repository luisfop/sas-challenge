<template>
  <main>
    <b-container fluid>
      <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <navbar />
        <div class="container">
          <nuxt />
        </div>
      </div>
    </b-container>
  </main>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style scoped>
.container{
  margin-top: 4rem;
  height: 100%;
  width: 100%;
}
</style>