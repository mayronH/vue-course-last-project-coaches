<script setup lang="ts">
import { onMounted, ref } from 'vue'

const navBtn = ref()

onMounted(() => {
  // navbar burger script
  if (navBtn.value) {
    navBtn.value.addEventListener('click', () => {
      const isExpanded = navBtn.value.getAttribute('aria-expanded')
      if (isExpanded == 'true') {
        navBtn.value.setAttribute('aria-expanded', 'false')
      }
      if (isExpanded == 'false') {
        navBtn.value.setAttribute('aria-expanded', 'true')
      }
    })
  }
})
</script>

<template>
  <header>
    <nav class="header">
      <div class="nav-wrapper">
        <div class="logo">
          <RouterLink to="/">
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
                d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
              />
            </svg>
          </RouterLink>
        </div>

        <button
          ref="navBtn"
          class="btn-menu"
          type="button"
          aria-expanded="false"
          aria-controls="menu"
          aria-label="open mobile nav"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <ul id="menu" class="nav-links" role="menubar">
          <li role="none">
            <RouterLink
              :to="{ name: 'Coaches' }"
              role="menuitem"
              class="nav-link"
              >Coaches</RouterLink
            >
          </li>

          <li role="none">
            <RouterLink
              v-if="false"
              :to="{ name: 'SignUp' }"
              role="menuitem"
              class="nav-link"
              >Sign Up</RouterLink
            >
            <RouterLink
              v-else
              :to="{ name: 'Requests' }"
              role="menuitem"
              class="nav-link"
              >Requests</RouterLink
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--bg-medium);
  width: 100%;
}
.logo svg {
  height: 50px;
  width: 50px;
  color: var(--accent);
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--extra-small-size-fluid) var(--medium-size-fluid);
}
.nav-links {
  position: absolute;
  top: calc(50px + 2 * var(--extra-small-size-fluid));
  left: 0;
  right: 0;
  z-index: 20;
  background-color: var(--bg-medium);
  padding: 1.5rem;
  border-bottom: 2px solid var(--accent);
  transform: translate3d(0, -200%, 0);
  transition: transform 0.2s cubic-bezier(0.64, 0.04, 0.26, 0.87);
  list-style: none;
  text-align: center;
}
.nav-link.github {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--accent);
  color: var(--bg-dark);
  font-weight: 600;
  padding: 0.25rem var(--extra-small-size-fluid);
  border-radius: var(--border-radius);
}
.btn-menu {
  cursor: pointer;
  color: var(--accent);
  background-color: transparent;
  border: none;
  display: grid;
  place-items: center;
  padding-inline: 1rem;
}
.btn-menu[aria-expanded='true'] + .nav-links {
  transform: translate3d(0, 0, 0);
}
.nav-links li {
  display: block;
  padding: 5px 0px;
}
.nav-link {
  color: var(--text);
  text-decoration: none;
}
@media (min-width: 768px) {
  .nav-wrapper {
    justify-content: space-between;
  }
  .btn-menu {
    display: none;
  }
  .nav-links {
    position: static;
    display: flex;
    align-items: center;
    transform: translate3d(0, 0, 0);
    border-bottom: 0;
    z-index: 0;
    padding: 0;
    inset: 0;
    background-color: transparent;
  }
  .nav-links li {
    display: inline;
    padding: 0px 5px;
  }
  li,
  .nav-link {
    width: initial;
  }
}
</style>
