<template>
  <button
    @click="toggleTheme"
    class="theme-toggle"
    :aria-label="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
    :title="theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
  >
    <!-- Moon icon for light mode (click to go dark) -->
    <svg v-if="theme === 'light'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    <!-- Sun icon for dark mode (click to go light) -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<style scoped>
.theme-toggle {
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

.theme-toggle:hover {
  background: var(--color-white-alpha-10);
  border-color: var(--color-white-alpha-50);
  transform: rotate(15deg);
}

.theme-toggle:active {
  transform: rotate(15deg) scale(0.95);
}

.theme-toggle svg {
  display: block;
}

@media (max-width: 768px) {
  .theme-toggle {
    width: 36px;
    height: 36px;
    padding: 0.4rem;
  }

  .theme-toggle svg {
    width: 18px;
    height: 18px;
  }
}
</style>
