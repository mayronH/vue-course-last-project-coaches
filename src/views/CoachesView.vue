<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCoachStore } from '../stores/coach'

import CoachItem from '../components/CoachItem.vue'
import CoachFilter from '../components/CoachFilter.vue'

const coachStore = useCoachStore()
const activeFilter = ref('')

function setFilter(filter: string) {
  activeFilter.value = filter
}

const filteredCoaches = computed(() => {
  const coaches = coachStore.coaches
  if (activeFilter.value === '' || activeFilter.value === 'clear') {
    return coaches
  }
  return coaches.filter((coach) => {
    if (coach.areas.includes(activeFilter.value)) return true
  })
})

const isEmpty = computed(() => {
  return filteredCoaches.value.length > 0
})
</script>

<template>
  <main class="content">
    <section class="actions">
      <div class="filter">
        <CoachFilter @change-filter="setFilter"></CoachFilter>
      </div>

      <div class="controls">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>
    </section>

    <div class="coaches">
      <section v-if="isEmpty" class="list">
        <TransitionGroup name="coach-list" appear>
          <CoachItem
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :coach="coach"
          ></CoachItem>
        </TransitionGroup>
      </section>

      <section v-else class="empty">
        <svg
          width="100px"
          height="100px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.1213 21.364L19.2426 19.2427M21.364 17.1214L19.2426 19.2427M19.2426 19.2427L17.1213 17.1214M19.2426 19.2427L21.364 21.364"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4 6V12C4 12 4 15 11 15C18 15 18 12 18 12V6"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 3C18 3 18 6 18 6C18 6 18 9 11 9C4 9 4 6 4 6C4 6 4 3 11 3Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 21C4 21 4 18 4 18V12"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <h3>No Coaches Find</h3>
      </section>
    </div>
  </main>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: right;
  gap: 1rem;

  width: 100%;

  padding-block: var(--small-size-fluid);
}

.coaches {
  width: 100%;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--medium-size-fluid);
}

.controls button {
  gap: var(--extra-small-size-fluid);

  border-bottom: 2px solid var(--accent2);
}
.controls svg {
  width: 1rem;
  height: 1rem;
}

.empty {
  text-align: center;
}

.coach-list-enter-from,
.coach-list-leave-to {
  opacity: 0;
}
.coach-list-enter-active,
.coach-list-leave-active {
  transition: all 0.8s ease;
}
.coach-list-leave-active {
  position: absolute;
}
.coach-list-move {
  transition: all 0.4s ease;
}

@media screen and (min-width: 768px) {
  .list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--small-size-fluid);
    align-items: stretch;
  }
}
</style>
