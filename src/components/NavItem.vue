<template>
  <a
    :href="href"
    :class="['text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium', { 'bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium': isActive }]"
  >
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      required: true,
    },
    isActive: Boolean,
  },
}
</script>