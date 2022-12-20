<template>
  <div>
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only>
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ["infoModal"],
};
</script>

<style>
</style>