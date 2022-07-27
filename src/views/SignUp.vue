<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCoachStore } from '../stores/coach'
import { Coach } from '../types'

import useVuelidate from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const coachStore = useCoachStore()
const router = useRouter()

const coach = ref<Coach>({
  id: '',
  firstName: '',
  lastName: '',
  description: '',
  areas: [],
  hourlyRate: 0,
})

const rules = computed(() => {
  return {
    firstName: { required },
    lastName: { required },
    description: { required },
    areas: { required },
    hourlyRate: { required, minValue: minValue(1) },
  }
})

const v$ = useVuelidate(rules, coach.value)

async function saveCoach() {
  const result = await v$.value.$validate()
  if (result) {
    // alert('Form successfully submitted.')
    coachStore.addCoach(coach.value)
    router.push({ name: 'Coaches' })
  }
}
</script>

<template>
  <main class="content">
    <form class="form" @submit.prevent="saveCoach">
      <h2>Register as a coach</h2>
      <!-- <div class="errors">
        <p>Errors:</p>
        <ul>
          <li v-for="error in v$.$errors" :key="error.$uid">
            {{ error.$property }} - {{ error.$message }}
          </li>
        </ul>
      </div> -->
      <div class="input">
        <label for="first_name">First Name</label>
        <input id="first_name" v-model="coach.firstName" type="text" />
        <span
          v-for="error in v$.firstName.$errors"
          :key="error.$uid"
          class="error"
          >{{ error.$message }}</span
        >
      </div>

      <div class="input">
        <label for="last_name">Last Name</label>
        <input id="last_name" v-model="coach.lastName" type="text" />
        <span
          v-for="error in v$.lastName.$errors"
          :key="error.$uid"
          class="error"
          >{{ error.$message }}</span
        >
      </div>

      <div class="input">
        <label for="description">Description</label>
        <textarea id="description" v-model="coach.description"></textarea>
        <span
          v-for="error in v$.description.$errors"
          :key="error.$uid"
          class="error"
          >{{ error.$message }}</span
        >
      </div>

      <h3>Specialization Area</h3>
      <div class="inline-input">
        <div>
          <label for="area_frontend">Frontend</label>
          <input
            id="area_frontend"
            v-model="coach.areas"
            value="frontend"
            type="checkbox"
          />
        </div>

        <div>
          <label for="area_backend">Backend</label>
          <input
            id="area_backend"
            v-model="coach.areas"
            value="backend"
            type="checkbox"
          />
        </div>

        <div>
          <label for="area_career">Career</label>
          <input
            id="area_career"
            v-model="coach.areas"
            value="career"
            type="checkbox"
          />
        </div>
        <span
          v-for="error in v$.areas.$errors"
          :key="error.$uid"
          class="error"
          >{{ error.$message }}</span
        >
      </div>

      <div class="input">
        <label for="hourly_rate">Hourly Rate</label>
        <input id="hourly_rate" v-model="coach.hourlyRate" type="number" />
        <span
          v-for="error in v$.hourlyRate.$errors"
          :key="error.$uid"
          class="error"
          >{{ error.$message }}</span
        >
      </div>

      <div class="buttons">
        <button type="submit">Submit</button>
      </div>
    </form>
  </main>
</template>

<style scoped>
h2,
h3 {
  margin-bottom: var(--extra-small-size-fluid);
}
.form {
  background-color: var(--bg-lighter);

  border-top: 5px solid var(--accent2);

  padding: var(--medium-size-fluid);

  width: 100%;
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
input[type='number'],
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

button {
  background-color: var(--accent2);
  padding: 0.5rem var(--small-size-fluid);

  margin-left: auto;
}

.error {
  font-weight: 300;
  color: var(--accent);
  text-transform: lowercase;
}
</style>
