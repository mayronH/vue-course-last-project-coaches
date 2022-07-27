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

.badges {
  display: flex;
  justify-content: space-evenly;
  gap: var(--small-size-fluid);
}
.badges span {
  padding: var(--extra-small-size-fluid);

  box-shadow: var(--box-shadow);

  font-weight: 500;

  background-color: var(--bg-medium);
}
.badges span.frontend {
  background-color: var(--accent);

  color: var(--bg-dark);
}
.badges span.backend {
  background-color: var(--accent2);

  color: var(--bg-dark);
}
.badges span.career {
  background-color: var(--accent3);

  color: var(--bg-dark);
}

button {
  display: flex;
  align-items: center;

  padding: 0.5rem;

  background-color: var(--bg-lighter);

  border: none;

  box-shadow: var(--box-shadow);

  color: var(--white);
  font-size: 1rem;

  cursor: pointer;
}

@media screen and (min-width: 768px) {
  main.content p {
    text-align: left;
  }
}
</style>
