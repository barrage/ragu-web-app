<script setup lang="ts">
/**
 * SVGIcon Component
 *
 * This component renders an SVG icon with customizable properties.
 * By default, the icon's fill color is set to `currentColor`, which means it inherits the color from the parent element.
 * To preserve the SVG's original colors, set the `original` prop to `true`.
 * You can also specify the icon's size, width, height, and color.
 *
 * Props:
 * - `icon` (object, required): The SVG icon component (Vue component).
 * - `size` (string, optional): Sets both width and height. Overrides `width` and `height`. Default: `""`.
 * - `width` (string, optional): Icon width, ignored if `size` is set. Default: `"20"`.
 * - `height` (string, optional): Icon height, ignored if `size` is set. Default: `"20"`.
 * - `color` (string, optional): Icon color, used if `original` is `false`. Default: `""`.
 * - `original` (boolean, optional): Use original SVG colors if `true`. Default: `false`.
 *
 * Default Prop Values:
 * - `size`: ""
 * - `width`: "20"
 * - `height`: "20"
 * - `color`: ""
 * - `original`: false
 */

interface Props {
  icon: object
  size?: string
  width?: string
  height?: string
  color?: string
  original?: boolean
}

withDefaults(defineProps<Props>(), {
  size: () => '',
  width: () => '20',
  height: () => '20',
  color: () => '',
  original: () => false,
})
</script>

<template>
  <component
    :is="icon"
    :class="{
      'svg-icon--fill': !original,
    }"
    :style="{
      width: size || width,
      height: size || height,
      color: original ? 'currentColor' : color,
    }"
  />
</template>
