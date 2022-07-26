<script setup lang="ts">
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<template>
  <footer>
    <small>
      Made with ❤️ by <a href="https://github.com/mayronH">mayronH</a>
      {{ currentYear }}</small
    >
  </footer>
</template>

<style scoped>
footer {
  text-transform: lowercase;
  text-align: center;
  padding: var(--small-size-fluid) 0;
  background: var(--bg-medium);
  display: grid;
  place-items: center;
}
footer a {
  color: var(--accent);
  text-decoration: none;
}
</style>
