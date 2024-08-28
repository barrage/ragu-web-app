<script lang="ts" setup>
import ArrowRight from '~/assets/icons/svg/arrow-right.svg'

const heroWidgets = [
  {
    title: 'Get started',
    description: 'Quick setup guide for getting started with the boilerplate.',
    link: 'https://confluence.barrage.net/display/BD/Get+Started',
  },
  {
    title: 'Arhitecture',
    description: 'Explore the architecture of our Barrage Nuxt 3 boilerplate',
    link: 'https://confluence.barrage.net/display/BD/Boilerplate+Architecture',
  },
  {
    title: 'Styling and Theming ',
    description: 'Step-by-step guide to app theming and styling.',
    link: 'https://confluence.barrage.net/display/BD/Styling+and+Theming',
  },
  {
    title: 'Stack',
    description: 'Details on the technologies and libraries used.',
    link: 'https://confluence.barrage.net/display/BD/Default+Stack+Overview',
  },
  {
    title: 'Coding ',
    description: 'Follow these rules for clean, consistent code.',
    link: 'https://confluence.barrage.net/display/BD/Development+Guidelines',
  },
  {
    title: 'Definition of Done',
    description: 'Criteria for marking tasks or features as complete.',
    link: 'https://confluence.barrage.net/pages/viewpage.action?pageId=92147453',
  },
]
</script>

<template>
  <section class="header-section">
    <div class="title-container">
      <div>
        <h4>Welcome to</h4>
        <h2>
          Barrage
          <b class="nuxt-title">Nuxt</b>
          Boilerplate
        </h2>
      </div>

      <p>
        A modern, scalable setup for efficient web development. Follow the
        provided documentation for setup and usage.
      </p>
      <div>
        <p>References</p>

        <ul>
          <li>
            <a
              href="https://confluence.barrage.net/display/BD/Barrage+Nuxt+3+Boilerplate"
              target="_blank"
              class="reference-link"
            >
              Barrage Confluence <ArrowRight />
            </a>
          </li>
          <li>
            <a
              href="https://nuxt.com"
              target="_blank"
              class="reference-link"
            >
              Nuxt documentation <ArrowRight />
            </a>
          </li>
          <li>
            <a
              href="https://vuejs.org"
              target="_blank"
              class="reference-link"
            >
              Vue documentation <ArrowRight />
            </a>
          </li>
          <li>
            <a
              href="https://element-plus.org"
              target="_blank"
              class="reference-link"
            >
              Element plus documentation <ArrowRight />
            </a>
          </li>
        </ul>
      </div>
    </div>

    <section class="boilerplate-widgets-section">
      <template v-for="widget in heroWidgets" :key="widget.title">
        <HeroSectionWidget :hero-widget="widget" />
      </template>
    </section>
  </section>
</template>

<style lang="scss" scoped>
ul {
  list-style-type: disc;
  margin-bottom: 1.25em;
  margin-top: 1.25em;
  padding-inline-start: 1.625em;
  color: var(--color-gray-700);
  li {
    display: list-item;
    width: fit-content;
    margin-bottom: 0.5em;
    margin-top: 0.5em;
  }
}
.header-section {
  display: flex;
  gap: 22px;

  & .title-container {
    flex: 1 0 calc(50% - 22px);
    display: flex;
    flex-direction: column;
    text-align: start;
    gap: var(--spacing-fluid-s);
    padding-top: 32px;

    & h4 {
      color: var(--color-gray-800);
    }
    & h2 {
      font-size: var(--font-size-fluid-8);
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-800);
    }

    & p {
      font-size: var(--font-size-fluid-3);
      color: var(--color-gray-600);
    }
  }
}
.boilerplate-widgets-section {
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  flex: 1 0 calc(50% - 22px);

  & .boilerplate-widget {
    flex: 1 0 calc(50% - 22px);
  }
}

.reference-link {
  display: flex;
  gap: 8px;
  margin-left: auto;
  font-size: var(--font-size-desktop-2);
  align-items: center;
  padding: 3px;
  &:hover {
    color: var(--color-green-300);
  }
}

.nuxt-title {
  color: var(--color-green-600);
}

.dark {
  & .header-section {
    & .title-container {
      & h4 {
        color: var(--color-gray-200);
      }
      & h2 {
        color: var(--color-gray-100);
      }
      & .nuxt-title {
        color: #00dc81;
      }

      & p {
        font-size: var(--font-size-fluid-3);
        color: var(--color-gray-400);
      }
      & ul {
        color: var(--color-gray-300);
      }
    }
  }
}
</style>
