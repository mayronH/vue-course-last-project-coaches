<script setup lang="ts">
import { useRequestStore } from '../../stores/request'
import RequestItem from '../../components/RequestItem.vue'
import { computed, onBeforeMount } from 'vue'
import BaseSpinner from '../../components/BaseSpinner.vue'

const requestStore = useRequestStore()

const isEmpty = computed(() => {
  return requestStore.requests.length > 0
})

onBeforeMount(async () => {
  await requestStore.loadRequests()
})
</script>

<template>
  <main class="content">
    <BaseSpinner v-if="requestStore.isLoading"></BaseSpinner>
    <div v-else-if="!isEmpty" class="empty">
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
      <h3>You haven't received any request yet</h3>
    </div>
    <div v-else class="requests">
      <h2>Requests Received</h2>
      <RequestItem
        v-for="request in requestStore.requests"
        :key="request.id"
        :request="request"
      ></RequestItem>
    </div>
  </main>
</template>

<style scoped>
main.content {
  padding-inline: var(--small-size-fluid);
}
.requests {
  display: flex;
  flex-direction: column;
  gap: var(--small-size-fluid);

  background-color: var(--bg-medium);

  padding: var(--small-size-fluid);

  width: 100%;
}

@media screen and (min-width: 768px) {
  main.content {
    padding-inline: var(--medium-size-fluid);
  }
}
</style>
