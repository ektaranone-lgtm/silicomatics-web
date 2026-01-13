<template>
  <button
    @click="toggleAnimation"
    class="animation-toggle"
    :aria-label="animationState === 'on' ? 'Turn off background animation' : 'Turn on background animation'"
    :title="animationState === 'on' ? 'Turn off background animation' : 'Turn on background animation'"
  >
    <!-- Stars icon for animation on (click to turn off) -->
    <svg v-if="animationState === 'on'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
    <!-- Stars off icon (click to turn on) -->
    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="1" y1="1" x2="23" y2="23"></line>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useAnimation } from '@/composables/useAnimation'

const { animationState, toggleAnimation } = useAnimation()
</script>

<style scoped>
.animation-toggle {
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

.animation-toggle:hover {
  background: var(--color-white-alpha-10);
  border-color: var(--color-white-alpha-50);
  transform: scale(1.1);
}

.animation-toggle:active {
  transform: scale(1.05);
}

.animation-toggle svg {
  display: block;
}

@media (max-width: 768px) {
  .animation-toggle {
    width: 36px;
    height: 36px;
    padding: 0.4rem;
  }

  .animation-toggle svg {
    width: 18px;
    height: 18px;
  }
}
</style>
