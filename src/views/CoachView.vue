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
        <RouterLink
          v-if="!route.path.match('contact')"
          :to="{ name: 'Contact' }"
          class="contact-link"
        >
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Contact
        </RouterLink>
        <RouterView v-slot="{ Component }">
          <Transition name="page-transition" appear mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
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

  width: 100%;
}
p {
  line-height: 2rem;

  margin-bottom: var(--small-size-fluid);

  text-align: justify;
}
footer {
  display: flex;
  justify-content: center;
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--extra-small-size-fluid);
}

.contact-link {
  display: flex;
  align-items: center;
  gap: var(--extra-small-size-fluid);

  color: var(--bg-dark);
  text-decoration: none;
  text-transform: lowercase;
  text-align: center;

  padding: var(--small-size-fluid);

  background-color: var(--accent3);
}

.contact-link svg {
  width: var(--medium-size-fluid);
  height: var(--medium-size-fluid);
}

.contact-link:is(:hover, :focus) {
  animation: jumping 0.5s cubic-bezier(0.075, 0.82, 0.165, 1) infinite;

  font-weight: 600;
}

@keyframes jumping {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.page-transition-enter-active {
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
  transform: translate3d(0, -200px, 0);
}

@media screen and (min-width: 768px) {
  footer {
    justify-content: right;
  }
}
</style>
