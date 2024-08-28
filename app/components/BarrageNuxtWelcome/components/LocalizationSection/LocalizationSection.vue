<script setup lang="ts">
import Globe from '~/assets/icons/svg/globe.svg'

// SETUP
const { setLocale, locales, locale } = useI18n()

// DROPDOWN OPTIONS
const popperOptions = {
  placement: 'bottom-start',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top-start'],
      },
    },
  ],
}

// COMPUTEDS
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const currentLanguageName = computed(() => {
  const current = locales.value.find(i => i.code === locale.value)
  return current ? current.name : locale.value
})

// HELPERS
const setCurrentLocale = async (localeCode: string) => {
  setLocale(localeCode)
}
</script>

<template>
  <section class="localization-section">
    <h4>Localization</h4>
    <div class="text-content">
      <p>{{ $t("localization_example.title") }}</p>
      <p>{{ $t("localization_example.text") }}</p>
      <ClientOnly>
        <p v-for="paragraph in $tm('localization_example.section')" :key="paragraph">
          {{ $rt(paragraph.title) }} - {{ $rt(paragraph.description) }}
        </p>
      </ClientOnly>
    </div>
    <ClientOnly>
      <el-dropdown trigger="click" :popper-options="popperOptions">
        <el-button size="small">
          <Globe />
          <p>
            {{ currentLanguageName }}
          </p>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="locale in availableLocales"
              :key="locale.code"
              @click="setCurrentLocale(locale.code)"
            >
              {{ locale.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </ClientOnly>
  </section>
</template>

<style lang="scss" scoped>
.localization-section {
  display: flex;
  margin-bottom: 50px;
  flex-direction: column;
  gap: 22px;
}
</style>
