import { ref, watch } from 'vue'

export type AnimationState = 'on' | 'off'

// Create a singleton state that's shared across all components
const animationState = ref<AnimationState>('on')
let initialized = false

// Initialize from localStorage once
if (typeof window !== 'undefined' && !initialized) {
  const savedState = localStorage.getItem('animation') as AnimationState | null
  if (savedState === 'on' || savedState === 'off') {
    animationState.value = savedState
  }
  initialized = true

  // Watch for animation state changes and save to localStorage
  watch(animationState, (newState) => {
    localStorage.setItem('animation', newState)
  })
}

export function useAnimation() {
  function toggleAnimation() {
    animationState.value = animationState.value === 'on' ? 'off' : 'on'
  }

  return {
    animationState,
    toggleAnimation
  }
}
