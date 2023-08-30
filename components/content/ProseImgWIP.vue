<!--
  The goal is to use this for static site genaration using nuxt image (https://image.nuxtjs.org/advanced/static-images).
  However, at the moment that feature of nuxt image is still under development for Nuxt 3.
  Therefore, this file is not used at the moment. To use it, rename it to ProseImg.vue.
-->

<template>
  <nuxt-img :src="src" :alt="alt" :width="width" :height="height" />
</template>
<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  }
});
</script>
