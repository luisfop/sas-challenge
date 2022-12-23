<template>
  <b-container fluid class="footer-pad">
    <b-row class="h-60" align-h="center" align-v="center">
      <b-col sm="12" lg="4">
        <div class="mb-2"></div>
        <h1 class="text-center mb-4">LOGIN</h1>
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
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Alfa+Slab+One&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.waviy {
  position: relative;
  font-size: 50px;
  margin-left: 1rem;
}
.waviy span {
  font-family: "Alfa Slab One", cursive;
  position: relative;
  display: inline-block;
  color: #c7ddcc;
  text-transform: uppercase;
  animation: waviy 1s infinite;
  animation-delay: calc(0.1s * var(--i));
}
@keyframes waviy {
  0%,
  40%,
  100% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-20px);
  }
}
</style>