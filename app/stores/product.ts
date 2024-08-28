// /stores/productsStore.ts
import { defineStore } from 'pinia'
import type { Filter, Product } from '~/types/products'

export const useProductStore = defineStore('product', () => {
  // CONSTANTS
  const { $api } = useNuxtApp()

  // STATE
  const products = ref<Product[]>([])
  const currentFilter = ref<Filter | null>(null)
  const filters = ref<Filter[]>([
    { label: 'Men\'s clothing', value: 'men\'s clothing' },
    { label: 'Jewelery', value: 'jewelery' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Women\'s clothing', value: 'women\'s clothing' },
  ])

  // COMPUTEDS
  const getFilteredProducts = computed(() => {
    return currentFilter?.value
      ? products.value.filter(product => product.category === currentFilter?.value?.value)
      : products.value || []
  })

  const fetchAllProducts = async () => {
    const data = await $api.product.fetchAllProducts()
    products.value = data
    return data
  }

  const fetchProduct = async (id: string) => {
    const data = await $api.product.fetchProduct(id)
    return data
  }

  const setCurrentFilter = (filter: Filter): void => {
    if (filter?.value === currentFilter?.value?.value) {
      currentFilter.value = null
      return
    }
    currentFilter.value = filter
  }

  return { products, filters, currentFilter, getFilteredProducts, fetchAllProducts, fetchProduct, setCurrentFilter }
})
