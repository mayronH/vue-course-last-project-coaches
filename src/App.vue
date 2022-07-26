<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <TheHeader />

  <RouterView />

  <TheFooter />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-height: 100vh;
}

main.content {
  flex: 1;

  width: 100%;

  display: grid;
  place-items: center;

  padding-block: var(--small-size-fluid);
  padding-inline: var(--medium-size-fluid);
}

main.content p {
  line-height: 2rem;

  margin-bottom: var(--small-size-fluid);

  text-align: justify;
}

@media screen and (min-width: 768px) {
  main.content p {
    text-align: left;
  }
}
</style>
