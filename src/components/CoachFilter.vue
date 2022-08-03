<script setup lang="ts">
import { ref } from 'vue'

const filter = ref('')

const emit = defineEmits(['change-filter'])
</script>

<template>
  <label for="filter">Filter By Areas</label>
  <div class="select">
    <select
      id="filter"
      v-model="filter"
      @change="emit('change-filter', filter)"
    >
      <option value="">Filter By Areas</option>
      <option value="frontend">Frontend</option>
      <option value="backend">Backend</option>
      <option value="career">Career</option>
      <option value="clear">Clear Filter</option>
    </select>
  </div>
</template>

<style scoped>
select {
  background-color: var(--bg-lighter);
  color: var(--white);
  border: none;
  border-bottom: 2px solid var(--accent2);
  padding: 0.5rem;

  text-align: center;

  width: 100%;
}
label {
  opacity: 0;
  visibility: hidden;
  position: absolute;
  transform: translate3d(-999px, -999px, 0);
}
</style>
