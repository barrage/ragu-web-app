<script lang="ts" setup>
import ArrowRight from '~/assets/icons/svg/arrow-right.svg'
import TabletIcon from '~/assets/icons/svg/tablet.svg'
import MobileIcon from '~/assets/icons/svg/mobile.svg'
import DesktopIcon from '~/assets/icons/svg/desktop.svg'

// Media data
const mobileMedia = [
  { name: 'Mobile first', value: '0px' },
  { name: 'xs', value: '575px' },
]

const tabletMedia = [
  { name: 's', value: '768px' },
  { name: 'm', value: '990px' },
]

const desktopMedia = [
  { name: 'ml', value: '1280px' },
  { name: 'l', value: '1440px' },
  { name: 'xl', value: '1920px' },
  { name: 'xxl', value: '2560px' },
]

const mediaGroups = [
  { media: mobileMedia, icon: MobileIcon, title: 'Mobile' },
  { media: tabletMedia, icon: TabletIcon, title: 'Tablet' },
  { media: desktopMedia, icon: DesktopIcon, title: 'Desktop' },
]
</script>

<template>
  <section class="default-media-showcase-section">
    <TabTtitleContainer
      title="Media"
      file="assets/media.scss"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/assets/styles/mixins/_media.scss"
    />

    <div class="media-overview-wrapper">
      <div
        v-for="(group, index) in mediaGroups"
        :key="index"
        class="group-media-overview"
      >
        <div class="group-wrapper">
          <div
            v-for="(media, mediaIndex) in group.media"
            :key="media.name"
            class="media-showcase"
          >
            <p class="media-name">
              {{ media.name }}
            </p>
            <span class="media-description">{{ media.value }}</span>
            <ArrowRight v-if="mediaIndex < group.media.length - 1" />
          </div>
        </div>
        <div class="icon-wrapper">
          <component :is="group.icon" style="width: 84px; height: 84px" />
          <h6>{{ group.title }}</h6>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.media-overview-wrapper {
  display: flex;
  gap: 22px;
  margin: auto;

  .group-media-overview {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding-right: 12px;
    border-right: 1px solid var(--color-gray-700);

    .group-wrapper {
      display: flex;
      gap: 12px;
    }
  }
}

.icon-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.default-media-showcase-section {
  display: flex;
  flex-direction: column;
  gap: 32px;

  .media-wrapper {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .media-showcase {
    display: flex;
    align-items: center;
    gap: 6px;

    .media-name {
      padding: 3px 6px;
      border: 1px solid var(--color-gray-500);
      border-radius: 5px;
      font-weight: var(--font-weight-bold);
    }

    .media-description {
      color: var(--color-gray-600);
    }
  }
}

.dark {
  .media-showcase {
    .media-description {
      color: var(--color-gray-400);
    }
  }
}
</style>
