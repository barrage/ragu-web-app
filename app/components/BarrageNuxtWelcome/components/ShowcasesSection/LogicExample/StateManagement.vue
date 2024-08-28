<template>
  <section class="pinia-section">
    <TabTtitleContainer
      title="State Management"
      file="app/stores"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/stores"
    />
    <p>
      Our Nuxt 3 boilerplate leverages <strong class="pinia-text">Pinia</strong> for state management.
      <br>
      Pinia provides a modern, intuitive, and type-safe API for managing state in Vue 3 applications.
    </p>
    <p>
      <b>Explore the Pinia documentation for a comprehensive guide on how to use it effectively</b>
    </p>
    <div class="links-wrapper">
      <a
        class="pinia-link"
        href="https://pinia.vuejs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pinia Documentation
      </a>
    </div>
    <div class="additional-info">
      <FileRedirect file="app/stores" redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/stores" />
      <p>
        Inside this  folder, you'll find Pinia store files. This includes:
      </p>
      <ul>
        <li>
          <FileRedirect file="app/stores/counter.ts" redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/stores/counter.ts" /> Simple example for Pinia store, includes state and methods examples.
        </li>
      </ul>
    </div>
  </section>
</template>

  <style lang="scss" scoped>
  .pinia-section {
  padding: 20px;
  border-radius: 8px;
}

.pinia-section h1 {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.pinia-section p {
  margin-bottom: 1em;
  font-size: 1em;
  color: var(--color-gray-600);

  & b {
    color: var(--color-gray-800);
  }
}

.pinia-link {
  color: var(--color-gray-50);
  text-decoration: none;
  font-weight: bold;
  border: 1px solid var(--color-blue-500);
  border-radius: 8px;
  padding: 8px;
  background: var(--color-blue-400);
  transition: all 0.2s ease;
}

.pinia-link:hover {
  background: var(--color-blue-200);
}

.links-wrapper {
  display: flex;
  align-items: center;
  gap: 66px;
  margin-top: 32px;
}

.pinia-text {
  color: var(--color-blue-500);
}
.additional-info {
  margin-top: 32px;
  padding: 16px;
  border-top: 1px solid var(--color-gray-300);
  background: var(--color-gray-100);
  border-radius: 8px;

  p {
    margin-bottom: 8px;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      margin-top: 32px;
    }
  }

  code {
    background: var(--color-gray-200);
    padding: 2px 4px;
    border-radius: 4px;
  }
}
.dark {
  & .pinia-section {
    & p {
      color: var(--color-gray-400);
      & b {
        color: var(--color-gray-200);
      }
    }
  }
  & .additional-info {
    background: var(--color-darkmode-700);
    border-top: 1px solid var(--color-gray-600);
  }
  & .pinia-text {
    color: var(--color-blue-300);
  }
  & .pinia-link {
    color: var(--color-gray-100);
  }
  & .pinia-link:hover {
    color: var(--color-blue-700);
    background: var(--color-blue-100);
  }
}
</style>
