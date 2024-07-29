<template>
  <div id="app">
    <img src="@/assets/images/santa.webp" alt="Santa" class="santa-image">
    <router-view></router-view> <!-- This is where the routed components will be displayed -->
  </div>
</template>

<script setup>
</script>

<style scoped>
.santa-image {
  max-width: 500px;
  height: auto;
  max-width: 500px;
  display: block;
  margin: 0 auto;
  margin-right: 20px;
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .santa-image {
    max-width: 200px;
  }
}
</style>
