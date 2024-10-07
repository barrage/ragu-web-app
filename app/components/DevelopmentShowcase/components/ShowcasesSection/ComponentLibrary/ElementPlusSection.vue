<script lang="ts" setup>
</script>

<template>
  <div>
    <TabTtitleContainer title="Element Plus" />
    <p>To override styles in a Barrage Nuxt 3 Boilerplate project using the Element Plus component library, follow these steps:</p>
    <ol>
      <li>
        Ensure Element Plus is configured in your <b class="nuxt-name">nuxt.config.ts</b> file with styles disabled and a custom namespace:
        <pre><code class="code-block">
export default defineNuxtConfig({
  elementPlus: {
    /**
     * Set the `importStyle` to `false` to disable importing Element Plus styles
     */
    importStyle: false,
    /**
     * Changes the Element Plus namespace/prefix to be `barrage` instead of the default `el`
     */
    namespace: 'barrage',
  },
})
        </code></pre>
      </li>
      <li>
        For each Element Plus component you use, create a dedicated SCSS file for overriding the component styles in the <b>assets/styles/components</b> directory. Ensure you override all the classes that the Element Plus component provides.
      </li>
      <li>
        It is important to review the properties (props, emits, slots, and attributes) each Element Plus component provides and understand the HTML structure of each component before overriding its styles. This ensures that you know which classes and elements to target.
      </li>
      <li>
        Include your custom styles in your Nuxt 3 project. For example, if you're customizing the Button component, you can create a <code>button.scss</code> file in the <code>assets/styles/components</code> directory:
        <pre><code class="code-block">assets/styles/components/button.scss</code></pre>
      </li>
      <li>
        Import your custom styles in your component or globally:
        <pre><code class="code-block">@import '@/assets/styles/components/button.scss';</code></pre>
      </li>
    </ol>
    <p>
      Each Element Plus component has its own documentation that provides details on properties such as props, emits, slots, and attributes. Refer to the Element Plus documentation to understand the specific properties of each component. <a href="https://element-plus.org/en-US/component/overview.html" target="_blank">Element Plus Components Documentation</a>.
    </p>
  </div>
</template>

<style lang="scss" scoped>
p {
  margin: 16px 0;
  font-size: var(--font-size-fluid-3);
}

ol {
  padding-left: 20px;
  color: var(--color-gray-700);
}

li {
  margin-top: 42px;
  font-size: var(--font-size-fluid-3);
}

.code-block {
  display: block;
  padding: 12px;
  background-color: var(--color-gray-100);
  border-radius: 5px;
  overflow-x: auto;
  white-space: pre-wrap;
  font-size: var(--font-size-fluid-1);
  margin-top: 22px;
}

a {
  color: #3498db;
  text-decoration: none;
  font-size: var(--font-size-fluid-2);
}

a:hover {
  text-decoration: underline;
}
.nuxt-name {
  color: var(--color-green-600);
}

.dark {
  p {
    color: #e0e0e0;
  }

  .code-block {
    background-color: var(--color-gray-900);
    color: #e0e0e0;
  }

  a {
    color: #3498db;
  }
  & .nuxt-name {
    color: var(--color-green-400);
  }
  ol {
    color: var(--color-gray-300);
  }
}
</style>
