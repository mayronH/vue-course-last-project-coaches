<script setup lang="ts">
import { useCoachStore } from '../stores/coach'
import CoachItem from '../components/CoachItem.vue'
import { computed } from 'vue'

const coachStore = useCoachStore()

const filteredCoaches = computed(() => {
  return coachStore.coaches
})

const isEmpty = computed(() => {
  return filteredCoaches.value.length > 0
})
</script>

<template>
  <main class="content">
    <section class="filter"></section>
    <div class="coaches">
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
      <section v-if="isEmpty" class="list">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :coach="coach"
        ></CoachItem>
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
/* main.content {
  grid-template-rows: 1fr 5fr;
} */

.coaches {
  width: 100%;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--medium-size-fluid);
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  padding-block: var(--extra-small-size-fluid);
}
.controls button {
  display: flex;
  align-items: center;
  gap: var(--extra-small-size-fluid);

  padding: 0.5rem;

  background-color: var(--bg-lighter);

  border: none;
  border-bottom: 2px solid var(--accent2);

  box-shadow: var(--box-shadow);

  color: var(--white);
  font-size: 1rem;
}
.controls svg {
  width: 1rem;
  height: 1rem;
}

.empty {
  text-align: center;
}
@media screen and (min-width: 768px) {
  .list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--small-size-fluid);
    align-items: stretch;
  }
  .controls {
    justify-content: right;
  }
}
</style>
