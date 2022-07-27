<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCoachStore } from '../stores/coach'
import { Coach } from '../types'

const coachStore = useCoachStore()
const route = useRoute()
const currentCoach = ref<Coach>()

function getCurrentCoach() {
  coachStore.getCurrentCoach(route.params.id)
  currentCoach.value = coachStore.currentCoach[0]
}

const fullName = computed(() => {
  return `${currentCoach.value?.firstName} ${currentCoach.value?.lastName}`
})

onBeforeMount(() => getCurrentCoach())
</script>

<template>
  <main class="content">
    <div class="details">
      <section class="coach">
        <h2>{{ fullName }}</h2>
        <p>${{ currentCoach?.hourlyRate }}/hour</p>

        <p>{{ currentCoach?.description }}</p>

        <footer>
          <div class="badges">
            <span
              v-for="area in currentCoach?.areas"
              :key="area"
              :class="area"
              >{{ area }}</span
            >
          </div>
        </footer>
      </section>

      <section class="contact">
        <h3>Contact the Coach</h3>
        <RouterView />
      </section>
    </div>
  </main>
</template>

<style scoped>
.details {
  display: flex;
  flex-direction: column;
  gap: var(--small-size-fluid);

  background-color: var(--bg-medium);

  padding: var(--medium-size-fluid);
}
footer {
  display: flex;
  justify-content: center;
}

.contact {
  text-align: center;
}

@media screen and (min-width: 768px) {
  footer {
    justify-content: right;
  }
}
</style>
