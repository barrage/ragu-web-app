<script lang="ts" setup>
// IMPORTS
import UpIcon from '~/assets/icons/svg/up-navigation.svg'

// STATE
const isAnimated = ref<boolean>(false)

// HELPERS
const handleScroll = () => {
  const scrollPosition = window.scrollY
  const viewportHeight = window.innerHeight

  isAnimated.value = scrollPosition > viewportHeight * 0.5
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// HOOKS
onBeforeMount(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="scale">
    <div
      v-if="isAnimated"
      class="scroll-to-top"
      @click="scrollToTop"
    >
      <div class="scroll-to-top__inner">
        <UpIcon size="24" color="var(--shade-0)" />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.scroll-to-top {
  --background-color: var(--color-green-300);

  position: sticky;
  right: 0;
  bottom: 0;
  margin-left: auto;
  z-index: 2;

  &__inner {
    cursor: pointer;
    position: absolute;
    right: 22px;
    bottom: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: var(--background-color);
    border-radius: 50%;
    transition: 0.3s;

    &:hover {
      --background-color: var(--color-green-200);
    }
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}
</style>
