<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import CopyIcon from '~/assets/icons/svg/copy.svg'

const { copy } = useClipboard()

const copyToClipboard = (text: string) => {
  copy(text).then(() => {
  }).catch(() => {
  })
}
const colorGroups = {
  Darkmode: [
    { name: '--color-darkmode-0', value: '#2f2f2f' },
    { name: '--color-darkmode-100', value: '#2c2c2c' },
    { name: '--color-darkmode-200', value: '#2a2a2a' },
    { name: '--color-darkmode-300', value: '#252525' },
    { name: '--color-darkmode-400', value: '#222222' },
    { name: '--color-darkmode-500', value: '#1d1d1d' },
    { name: '--color-darkmode-600', value: '#1b1b1b' },
    { name: '--color-darkmode-700', value: '#181818' },
    { name: '--color-darkmode-800', value: '#131313' },
    { name: '--color-darkmode-900', value: '#070707' },
  ],
  Lightmode: [
    { name: '--color-lightmode-0', value: '#ffffff' },
    { name: '--color-lightmode-100', value: '#f7f8f9' },
    { name: '--color-lightmode-200', value: '#f1f2f4' },
    { name: '--color-lightmode-300', value: '#dcdfe4' },
    { name: '--color-lightmode-400', value: '#b3b9c4' },
    { name: '--color-lightmode-500', value: '#8590a2' },
    { name: '--color-lightmode-600', value: '#758195' },
    { name: '--color-lightmode-700', value: '#626f86' },
    { name: '--color-lightmode-800', value: '#44546f' },
    { name: '--color-lightmode-900', value: '#2c3e5d' },
  ],
  Gray: [
    { name: '--color-gray-50', value: '#f9f9f9' },
    { name: '--color-gray-100', value: '#ededed' },
    { name: '--color-gray-200', value: '#dcdcdc' },
    { name: '--color-gray-300', value: '#cacaca' },
    { name: '--color-gray-400', value: '#b9b9b9' },
    { name: '--color-gray-500', value: '#8a8a8a' },
    { name: '--color-gray-600', value: '#686868' },
    { name: '--color-gray-700', value: '#454545' },
    { name: '--color-gray-800', value: '#222222' },
    { name: '--color-gray-900', value: '#111111' },
  ],

  Blue: [
    { name: '--color-blue-subtle', value: '#d3d7f9' },
    { name: '--color-blue-0', value: '#d9e2ff' },
    { name: '--color-blue-100', value: '#aabcfd' },
    { name: '--color-blue-200', value: '#7d94f9' },
    { name: '--color-blue-300', value: '#576ff3' },
    { name: '--color-blue-400', value: '#3950ea' },
    { name: '--color-blue-500', value: '#2238df' },
    { name: '--color-blue-600', value: '#1326cf' },
    { name: '--color-blue-700', value: '#0819bd' },
    { name: '--color-blue-800', value: '#0311ab' },
    { name: '--color-blue-900', value: '#000d99' },
  ],
  Violet: [
    { name: '--color-violet-subtle', value: '#e4dbfb' },
    { name: '--color-violet-0', value: '#e2d9ff' },
    { name: '--color-violet-100', value: '#c8b5fd' },
    { name: '--color-violet-200', value: '#af93fb' },
    { name: '--color-violet-300', value: '#9a75f8' },
    { name: '--color-violet-400', value: '#885df2' },
    { name: '--color-violet-500', value: '#794ae9' },
    { name: '--color-violet-600', value: '#6c3bdb' },
    { name: '--color-violet-700', value: '#5e2ec6' },
    { name: '--color-violet-800', value: '#5024ab' },
    { name: '--color-violet-900', value: '#411c8c' },
  ],
  Green: [
    { name: '--color-green-subtle', value: '#ccf0e1' },
    { name: '--color-green-0', value: '#dbffed' },
    { name: '--color-green-100', value: '#8ff0c1' },
    { name: '--color-green-200', value: '#4ee19c' },
    { name: '--color-green-300', value: '#1bd27f' },
    { name: '--color-green-400', value: '#00c26d' },
    { name: '--color-green-500', value: '#00b367' },
    { name: '--color-green-600', value: '#00a461' },
    { name: '--color-green-700', value: '#00955a' },
    { name: '--color-green-800', value: '#008653' },
    { name: '--color-green-900', value: '#00774b' },
  ],
  Orange: [
    { name: '--color-orange-subtle', value: '#fee2d0' },
    { name: '--color-orange-0', value: '#ffe6cc' },
    { name: '--color-orange-100', value: '#ffc48e' },
    { name: '--color-orange-200', value: '#fea75b' },
    { name: '--color-orange-300', value: '#fd9038' },
    { name: '--color-orange-400', value: '#fc7e21' },
    { name: '--color-orange-500', value: '#f97012' },
    { name: '--color-orange-600', value: '#f46409' },
    { name: '--color-orange-700', value: '#e65703' },
    { name: '--color-orange-800', value: '#cd4901' },
    { name: '--color-orange-900', value: '#b63d00' },
  ],
  Red: [
    { name: '--color-red-subtle', value: '#fad2cf' },
    { name: '--color-red-0', value: '#ffcabf' },
    { name: '--color-red-100', value: '#fd9684' },
    { name: '--color-red-200', value: '#fb6a55' },
    { name: '--color-red-300', value: '#f84934' },
    { name: '--color-red-400', value: '#f2321e' },
    { name: '--color-red-500', value: '#e82010' },
    { name: '--color-red-600', value: '#d91308' },
    { name: '--color-red-700', value: '#c30a03' },
    { name: '--color-red-800', value: '#a70401' },
    { name: '--color-red-900', value: '#870000' },
  ],
  Magenta: [
    { name: '--color-magenta-subtle', value: '#ffecf8' },
    { name: '--color-magenta-0', value: '#f5d8ea' },
    { name: '--color-magenta-100', value: '#fdd0ec' },
    { name: '--color-magenta-200', value: '#f797d2' },
    { name: '--color-magenta-300', value: '#e774bb' },
    { name: '--color-magenta-400', value: '#da62ac' },
    { name: '--color-magenta-500', value: '#cd519d' },
    { name: '--color-magenta-600', value: '#ae4787' },
    { name: '--color-magenta-700', value: '#943d73' },
    { name: '--color-magenta-800', value: '#50253f' },
    { name: '--color-magenta-900', value: '#3d2232' },
  ],
  Yellow: [
    { name: '--color-yellow-subtle', value: '#f6f0d6' },
    { name: '--color-yellow-0', value: '#fff7d6' },
    { name: '--color-yellow-100', value: '#f8e6a0' },
    { name: '--color-yellow-200', value: '#f5cd47' },
    { name: '--color-yellow-300', value: '#e2b203' },
    { name: '--color-yellow-400', value: '#cf9f02' },
    { name: '--color-yellow-500', value: '#b38600' },
    { name: '--color-yellow-600', value: '#946f00' },
    { name: '--color-yellow-700', value: '#7f5f01' },
    { name: '--color-yellow-800', value: '#533f04' },
    { name: '--color-yellow-900', value: '#332e1b' },
  ],
  Lime: [
    { name: '--color-lime-subtle', value: '#eaf7d5' },
    { name: '--color-lime-0', value: '#efffd6' },
    { name: '--color-lime-100', value: '#d3f1a7' },
    { name: '--color-lime-200', value: '#b3df72' },
    { name: '--color-lime-300', value: '#94c748' },
    { name: '--color-lime-400', value: '#82b536' },
    { name: '--color-lime-500', value: '#6a9a23' },
    { name: '--color-lime-600', value: '#5b7f24' },
    { name: '--color-lime-700', value: '#4c6b1f' },
    { name: '--color-lime-800', value: '#37471f' },
    { name: '--color-lime-900', value: '#28311b' },
  ],
  Teal: [
    { name: '--color-teal-subtle', value: '#e2f2f7' },
    { name: '--color-teal-0', value: '#e7f9ff' },
    { name: '--color-teal-100', value: '#c6edfb' },
    { name: '--color-teal-200', value: '#9dd9ee' },
    { name: '--color-teal-300', value: '#6cc3e0' },
    { name: '--color-teal-400', value: '#42b2d7' },
    { name: '--color-teal-500', value: '#2898bd' },
    { name: '--color-teal-600', value: '#227d9b' },
    { name: '--color-teal-700', value: '#206a83' },
    { name: '--color-teal-800', value: '#164555' },
    { name: '--color-teal-900', value: '#1e3137' },
  ],
}
</script>

<template>
  <section class="barrage-colors-section">
    <TabTtitleContainer
      title="Colors"
      file="assets/styles/core/_colors.scss"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/assets/styles/core/_colors.scss"
    />

    <div class="colors-container">
      <div
        v-for="(colors, group) in colorGroups"
        :key="group"
        class="color-group"
      >
        <h6> <b>{{ group }}</b> </h6>
        <div class="colors-wrapper">
          <div
            v-for="(color, index) in colors"
            :key="color.name"
            class="color-example-container"
          >
            <div
              class="color-example"
              :class="{
                'dark-color': index < 5 && !(group === 'Darkmode'),
              }"
              :style="{ background: color.value }"
            >
              <span class="copy-color" @click="copyToClipboard(color.name)">{{ color.name }} <CopyIcon size="var(--font-size-fluid-2)" /></span>
              <span class="copy-color" @click="copyToClipboard(color.value)">{{ color.value }} <CopyIcon size="var(--font-size-fluid-2)" /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.barrage-colors-section {
  display: flex;
  flex-direction: column;
  gap: 22px;

  & .colors-container {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
  }
}

.color-group {
  flex: 1 0 calc(33% - 22px);
  display: flex;
  flex-direction: column;
  width: 100%;

  & h6 {
    margin: 24px 0px 16px;
    color: var(--color-gray-600);
    font-size: var(--font-size-fluid-3);
  }
}

.color-example-container {
  display: flex;
  align-items: center;
}

.color-example {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 18px 18px 18px 16px;
  height: 28px;
  color: var(--color-gray-100);
  font-size: var(--font-size-fluid-1);
  &.dark-color {
    color: var(--color-gray-800);
  }
}

.dark {
  & .color-group {
    & h6 {
      color: var(--color-gray-200);
    }
  }
}
.colors-wrapper {
  border-radius: 10px;
  overflow: hidden;
}
.copy-color {
  display: flex;
  gap: 8px;
  align-items: center;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
}
</style>
