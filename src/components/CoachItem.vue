<script setup lang="ts">
import { computed, PropType } from 'vue'
import { Coach } from '../types'

const props = defineProps({
  coach: {
    type: Object as PropType<Coach>,
    required: true,
  },
})

const fullName = computed(() => {
  return `${props.coach.firstName} ${props.coach.lastName}`
})
</script>

<template>
  <router-link
    class="link"
    :to="{ name: 'Coach', params: { id: props.coach.id } }"
  >
    <div class="coach">
      <header>
        <h2>{{ fullName }}</h2>
        <small class="hour">${{ props.coach.hourlyRate }}/hour</small>
      </header>

      <footer>
        <div class="badges">
          <span v-for="area in props.coach.areas" :key="area" :class="area">{{
            area
          }}</span>
        </div>
      </footer>
    </div>
  </router-link>
</template>

<style scoped>
.link {
  text-decoration: none;

  color: inherit;

  width: 100%;
}
.coach {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--small-size-fluid);

  height: 100%;

  background-color: var(--bg-lighter);
  border-top: 5px solid var(--accent2);

  padding: var(--medium-size-fluid);

  box-shadow: var(--box-shadow);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hour {
  background-color: var(--bg-medium);

  padding: var(--extra-small-size-fluid);
}

footer {
  display: flex;
  justify-content: center;
}

@media screen and (min-width: 768px) {
  footer {
    justify-content: right;
  }
}
</style>
