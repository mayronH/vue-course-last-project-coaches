<script setup lang="ts">
import { computed, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useAuthStore } from '../../stores/auth.js'
import { useRouter } from 'vue-router'
import BaseSpinner from '../../components/BaseSpinner.vue'

const authStore = useAuthStore()
const router = useRouter()

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
    if (await authStore.login(state.email, state.password)) {
      // router replace prevent from returning to the login with the back button on the browser
      router.replace({ name: 'Coaches' })
    }
  }
}
</script>

<template>
  <main class="content">
    <BaseSpinner v-if="authStore.isLoading"></BaseSpinner>
    <form v-else class="form" @submit.prevent="submitForm">
      <h2>User Login</h2>
      <small v-if="authStore.error" class="error">{{ authStore.error }}</small>
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
        <button class="button" type="submit">Login</button>
      </div>
    </form>
  </main>
</template>

<style scoped>
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: var(--small-size-fluid);
}
.button {
  margin: 0;
}
.contact-link {
  color: var(--bg-dark);
  text-decoration: none;
  text-align: center;

  padding: 0.5rem var(--small-size-fluid);

  background-color: var(--accent);
}
</style>
