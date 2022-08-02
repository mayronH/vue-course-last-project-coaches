<script setup lang="ts">
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

const state = reactive({
  email: '',
  password: '',
})

const rules = computed(() => {
  return {
    email: { required },
    password: { required },
  }
})

const v$ = useVuelidate(rules, state)

async function submitForm() {
  const result = await v$.value.$validate()
  if (result) {
    console.log(result)
  }
}
</script>

<template>
  <main class="content">
    <form class="form" @submit.prevent="submitForm">
      <h2>User Login</h2>
      <div class="input">
        <label for="email">E-mail</label>
        <input id="email" v-model="state.email" type="email" />
        <span v-for="error in v$.email.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </span>
      </div>

      <div class="input">
        <label for="password">Password</label>
        <input id="password" v-model="state.password" type="password" />
        <span
          v-for="error in v$.password.$errors"
          :key="error.$uid"
          class="error"
        >
          {{ error.$message }}
        </span>
      </div>

      <div class="buttons">
        <RouterLink :to="{ name: 'UserSignUp' }" class="contact-link">
          Sign Up
        </RouterLink>
        <button type="submit">Login</button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: var(--small-size-fluid);
}
.contact-link {
  color: var(--bg-dark);
  text-decoration: none;
  text-align: center;

  padding: 0.5rem var(--small-size-fluid);

  background-color: var(--accent);
}
</style>
