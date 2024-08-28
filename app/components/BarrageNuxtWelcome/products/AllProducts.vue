<script lang="ts" setup>
// CONSTANTS
const productStore = useProductStore()

// API CALLS
const { execute, error, status } = await useAsyncData(() => productStore.fetchAllProducts())

errorHandler(error)
</script>

<template>
  <div class="products">
    <h2 class="title">
      Example for Fetching data and handling it
    </h2>
    <button @click="execute()">
      Fetch products
    </button>
    <template v-if="status === 'pending'">
      <div

        class="spinner-wrapper"
      >
        <span class="loader" />
      </div>
    </template>
    <template v-if="error">
      <p>Failed to fetch products</p>
      <p>{{ error }}</p>
    </template>
    <template v-else>
      <div v-if="productStore?.getFilteredProducts?.length" class="filters">
        <span
          v-for="filter in productStore?.filters"
          :key="filter?.value"
          class="filter"
          :class="{ active: filter?.value === productStore?.currentFilter?.value }"
          @click="productStore?.setCurrentFilter(filter)"
        >{{ filter?.label }}</span>
      </div>
      <div
        class="product-wrapper"
      >
        <div
          v-for="product in productStore?.getFilteredProducts"
          :key="product.id"
          class="card"
        >
          <div class="title">
            {{ product.title }}
          </div>
          <div class="thumbnail">
            <img :src="product.image">
          </div>
          <div class="description">
            {{ product.description }}
          </div>
          <div class="wrapper-meta">
            <span class="price">${{ product.price }}</span>
            <span class="rate">☆ {{ product.rating.rate }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
:root {
  --card-height: 324px;
  --card-width: 288px;
  --spinner-size: 14px;
  --spinner-color: gray;
}

.products {
  padding-bottom: 100px;

  .title {
    margin-bottom: var(--spacing-fluid-xl);
  }
}

.spinner-wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.loader {
  color: var(--spinner-color);
  font-size: var(--spinner-size);
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  display: block;
  text-indent: -9999em;
  animation: mulShdSpin 1.3s infinite linear;
  transform: translateZ(0);
}

@keyframes mulShdSpin {
  0%,
  100% {
    box-shadow:
      0 -3em 0 0.2em,
      2em -2em 0 0em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 0;
  }
  12.5% {
    box-shadow:
      0 -3em 0 0,
      2em -2em 0 0.2em,
      3em 0 0 0,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }
  25% {
    box-shadow:
      0 -3em 0 -0.5em,
      2em -2em 0 0,
      3em 0 0 0.2em,
      2em 2em 0 0,
      0 3em 0 -1em,
      -2em 2em 0 -1em,
      -3em 0 0 -1em,
      -2em -2em 0 -1em;
  }
  37.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0em 0 0,
      2em 2em 0 0.2em,
      0 3em 0 0em,
      -2em 2em 0 -1em,
      -3em 0em 0 -1em,
      -2em -2em 0 -1em;
  }
  50% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 0em,
      0 3em 0 0.2em,
      -2em 2em 0 0,
      -3em 0em 0 -1em,
      -2em -2em 0 -1em;
  }
  62.5% {
    box-shadow:
      0 -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 0,
      -2em 2em 0 0.2em,
      -3em 0 0 0,
      -2em -2em 0 -1em;
  }
  75% {
    box-shadow:
      0em -3em 0 -1em,
      2em -2em 0 -1em,
      3em 0em 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0em 0 0.2em,
      -2em -2em 0 0;
  }
  87.5% {
    box-shadow:
      0em -3em 0 0,
      2em -2em 0 -1em,
      3em 0 0 -1em,
      2em 2em 0 -1em,
      0 3em 0 -1em,
      -2em 2em 0 0,
      -3em 0em 0 0,
      -2em -2em 0 0.2em;
  }
}

.filters {
  display: flex;
  column-gap: 20px;
  flex-wrap: wrap;

  .filter {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid var(--color-gray-500);
    &.active {
      border: 1px solid var(--color-green-400);
    }
  }
}

.product-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
  justify-content: center;
  padding: initial;
}

.card {
  background: #fff;
  border-radius: 19px;
  box-shadow:
    20px 20px 60px #d9d9d9,
    -20px -20px 60px #fff;
  margin: 20px;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: var(--card-height);
  width: var(--card-width);
  overflow: hidden;
  position: relative;
  font-family: sans-serif;
  font-size: 14px;
  font-weight: 400;
}

.card .title {
  font-weight: 700;
  color: rgb(197, 131, 8);
}

.card .thumbnail {
  align-items: center;
  display: flex;
  justify-content: center;
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
}

.card .thumbnail > img {
  height: 150px;
  object-fit: contain;
}

.card .description {
  margin-top: 1rem;
  font-size: 13px;
}

.card .wrapper-meta {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  font-size: 14px;
  font-weight: 700;
  margin-top: 2rem;
}
</style>
