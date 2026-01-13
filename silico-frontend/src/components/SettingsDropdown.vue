<template>
  <div class="settings-dropdown" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="settings-toggle"
      :aria-label="isOpen ? 'Close settings' : 'Open settings'"
      :title="isOpen ? 'Close settings' : 'Open settings'"
    >
      <!-- Eye icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="settings-menu" @click.stop>
        <AnimationToggle />
        <ThemeToggle />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import AnimationToggle from './AnimationToggle.vue'

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = (event: Event) => {
  event.stopPropagation()
  isOpen.value = !isOpen.value
}

const closeDropdown = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<style scoped>
.settings-dropdown {
  position: relative;
}

.settings-toggle {
  background: transparent;
  border: 2px solid var(--color-white-alpha-30);
  border-radius: 8px;
  color: var(--color-white);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
}

.settings-toggle:hover {
  background: var(--color-white-alpha-10);
  border-color: var(--color-white-alpha-50);
  transform: scale(1.1);
}

.settings-toggle:active {
  transform: scale(1.05);
}

.settings-toggle svg {
  display: block;
}

.settings-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: var(--color-dark-bg-dropdown);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  box-shadow: 0 8px 24px var(--color-black-alpha-20);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .settings-toggle {
    width: 36px;
    height: 36px;
    padding: 0.4rem;
  }

  .settings-toggle svg {
    width: 18px;
    height: 18px;
  }
}
</style>
