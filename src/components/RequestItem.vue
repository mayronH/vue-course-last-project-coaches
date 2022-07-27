<script setup lang="ts">
import { computed, PropType } from 'vue'
import { Request } from '../types'

const props = defineProps({
  request: {
    type: Object as PropType<Request>,
    required: true,
  },
})

const emailLink = computed(() => {
  return `mailto:${props.request.email}`
})
</script>

<template>
  <div class="request">
    <a :href="emailLink"
      ><h3>{{ props.request.email }}</h3>
    </a>
    <p>{{ props.request.message }}</p>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
a:is(:hover, :focus) {
  color: var(--accent);
}

h3 {
  font-size: var(--small-size-fluid);
}
.request {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--small-size-fluid);

  background-color: var(--bg-lighter);
  border-top: 5px solid var(--accent3);

  padding: var(--small-size-fluid);

  box-shadow: var(--box-shadow);
}

@media screen and (min-width: 768px) {
  .request {
    gap: var(--medium-size-fluid);
  }
}
</style>
