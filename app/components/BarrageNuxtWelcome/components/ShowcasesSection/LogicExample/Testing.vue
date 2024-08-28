<template>
  <section class="vitest-section">
    <TabTtitleContainer
      title="Vitest Framework"
      file="app/tests"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/tests"
    />
    <div class="description-wrapper">
      <p>
        Our Nuxt 3 boilerplate utilizes <strong class="vitest-text">Vitest</strong> for testing. <br>
      </p>
      <p>
        Vitest is a fast and lightweight testing framework designed to work seamlessly with Vite and modern JavaScript projects.
      </p>
      <p>
        <b>Visit the Vitest documentation to get started and explore its features</b>
      </p>
    </div>
    <div class="links-wrapper">
      <a
        class="vitest-link"
        href="https://vitest.dev"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vitest Documentation
      </a>
    </div>
    <!-- Additional description -->
    <div class="additional-info">
      <FileRedirect file="app/tests" redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/tests" />
      <p>
        Inside this  folder, you'll find Vitest test files. This includes:
      </p>
      <ul>
        <li>
          <FileRedirect file="app/tests/unit/utils" redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/tests/unit/utils" /> Contains tests for utility functions.
        </li>
        <li>
          <FileRedirect file="app/tests/unit/stores" redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/tests/unit/stores" /> Contains tests for state management logic and stores.
        </li>
        <li>
          <FileRedirect file="app/tests/components" redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/tests/components" /> Contains tests for individual Vue components.
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.vitest-section {
  padding: 20px;
  border-radius: 8px;
}

.vitest-section h1 {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.description-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.vitest-section p {
  font-size: 1em;
  color: var(--color-gray-600);

  & b {
    color: var(--color-gray-800);
  }
}

.vitest-link {
  color: var(--color-gray-50);
  text-decoration: none;
  font-weight: bold;
  border: 1px solid var(--color-yellow-500);
  border-radius: 8px;
  padding: 8px;
  background: var(--color-yellow-300);
  transition: all 0.2s ease;
}

.vitest-link:hover {
  background: var(--color-yellow-100);
  color: var(--color-yellow-900);
}

.links-wrapper {
  display: flex;
  align-items: center;
  gap: 66px;
  margin-top: 32px;
}

.vitest-text {
  color: var(--color-yellow-500);
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
  & .vitest-section {
    & p {
      color: var(--color-gray-400);
      & b {
        color: var(--color-gray-200);
      }
    }
  }
  & .vitest-link {
    color: var(--color-yellow-500);
    border: 1px solid var(--color-yellow-900);
    background: var(--color-darkmode-800);
  }
  & .vitest-link:hover {
    color: var(--color-yellow-300);
    border-color: var(--color-yellow-700);
    background: var(--color-darkmode-900);
  }
  & .additional-info {
    background: var(--color-darkmode-700);
    border-top: 1px solid var(--color-gray-600);
  }
  & code {
    background: var(--color-gray-600);
    color: var(--color-gray-50);
    padding: 2px 4px;
    border-radius: 4px;
  }
}
</style>
