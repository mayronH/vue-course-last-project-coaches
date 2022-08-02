<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRequestStore } from '../../stores/request'
import { Request } from '../../types'

const router = useRouter()
const route = useRoute()

const request = ref<Request>({
  id: '',
  email: '',
  message: '',
  coachId: route.params.id,
})

const requestStore = useRequestStore()

const rules = computed(() => {
  return {
    email: { required, email },
    message: { required },
  }
})

const v$ = useVuelidate(rules, request)

async function saveRequest() {
  const result = await v$.value.$validate()
  if (result) {
    // alert('Form successfully submitted.')
    requestStore.addRequest(request.value)
    router.push({ name: 'Requests' })
  }
}
</script>

<template>
  <form class="form" @submit.prevent="saveRequest">
    <div class="input">
      <label for="email">E-Mail</label>
      <input id="email" v-model="request.email" type="email" />
      <span v-for="error in v$.email.$errors" :key="error.$uid" class="error">
        {{ error.$message }}
      </span>
    </div>

    <div class="input">
      <label for="message">Message</label>
      <textarea id="message" v-model="request.message" rows="8"></textarea>
      <span v-for="error in v$.message.$errors" :key="error.$uid" class="error">
        {{ error.$message }}
      </span>
    </div>

    <div class="buttons">
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<style scoped></style>
