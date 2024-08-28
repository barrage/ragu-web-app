// we need explicit imports when running tests for store
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // STATE
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)

  // METHODS
  const increment = () => {
    count.value++
  }

  const incrementBy = (incrementor: number) => {
    count.value += incrementor
  }

  return { count, name, doubleCount, increment, incrementBy }
})
