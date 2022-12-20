<template>
  <b-nav small>
    <b-nav-item>
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    </b-nav-item>
    <b-nav-item>
      <NuxtLink to="/new-calendar">Create</NuxtLink>
    </b-nav-item>
  </b-nav>
</template>


<script>
export default {
  name: "Navbar",
};
</script>