import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark'

function applyTheme(newTheme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', newTheme)
  }
}

// Shared state - created once and reused across all components
const theme = ref<Theme>('dark')

// Apply theme immediately on module load
applyTheme(theme.value)

// Watch for theme changes and apply to document (no localStorage persistence)
watch(theme, (newTheme) => {
  applyTheme(newTheme)
})

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  return {
    theme,
    toggleTheme
  }
}
