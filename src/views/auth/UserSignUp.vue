<script setup lang="ts">
import { computed, defineAsyncComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

const BaseSpinner = defineAsyncComponent(
  () => import('../../components/BaseSpinner.vue')
)

const authStore = useAuthStore()
const router = useRouter()

const state = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { sameAsPassword: sameAs(state.password) },
  }
})

const v$ = useVuelidate(rules, state)

async function submitForm() {
  const result = await v$.value.$validate()
  if (result) {
    if (await authStore.signUp(state.email, state.password)) {
      router.replace({ name: 'Coaches' })
    }
  }
}
</script>

<template>
  <main class="content">
    <BaseSpinner v-if="authStore.isLoading"></BaseSpinner>
    <form v-else class="form" @submit.prevent="submitForm">
      <h2>User Sign Up</h2>
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

      <div class="input">
        <label for="confirm_password">Confirm Password</label>
        <input
          id="confirm_password"
          v-model="state.confirmPassword"
          type="password"
        />
        <span
          v-for="error in v$.confirmPassword.$errors"
          :key="error.$uid"
          class="error"
        >
          {{ error.$message }}
        </span>
      </div>

      <div class="buttons">
        <RouterLink :to="{ name: 'UserAuth' }" class="contact-link">
          Login
        </RouterLink>
        <button class="button" type="submit">Sign Up</button>
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
