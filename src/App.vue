<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
import { onBeforeMount } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onBeforeMount(() => {
  authStore.autoLogin()
})
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

/* main.content p {
  line-height: 2rem;

  margin-bottom: var(--small-size-fluid);

  text-align: justify;
} */

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

.button {
  display: flex;
  align-items: center;

  padding: 0.5rem;

  background-color: var(--bg-lighter);

  border: none;

  box-shadow: var(--box-shadow);

  color: var(--white);
  font-size: 1rem;
  text-decoration: none;
  text-align: center;

  cursor: pointer;
}

.form {
  background-color: var(--bg-lighter);

  border-top: 5px solid var(--accent2);

  padding: var(--medium-size-fluid);

  width: 100%;
}

.buttons .button {
  background-color: var(--accent2);
  padding: 0.5rem var(--small-size-fluid);

  margin-left: auto;
}

.error {
  font-weight: 300;
  color: var(--accent);
  text-transform: lowercase;
}

.input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  margin-bottom: var(--small-size-fluid);
}
.inline-input {
  display: flex;
  flex-direction: row;
  gap: var(--extra-small-size-fluid);

  margin-bottom: var(--small-size-fluid);
}
.inline-input div {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
label {
  color: var(--grey);
}
input[type='text'],
input[type='email'],
input[type='number'],
input[type='password'],
textarea {
  color: var(--white);
  background-color: var(--bg-medium);
  border: none;
  padding: 0.25rem var(--extra-small-size-fluid);
  width: 100%;
}

input:focus-visible,
textarea:focus-visible {
  outline-color: var(--accent);
}

textarea {
  resize: vertical;
}

.empty {
  text-align: center;
}

@media screen and (min-width: 768px) {
  /* main.content p {
    text-align: left;
  } */
}
</style>
