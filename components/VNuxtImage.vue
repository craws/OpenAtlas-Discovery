<script setup lang="ts">
interface vNuxtImageProps {
	height?: number | string;
	width?: number | string;
	src: string;
	alt: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<vNuxtImageProps>(), {
	height: 300,
	width: 300,
	src: "/img/header-bg.jpg",
});

// Comment out usage of NuxtImage as it's currently not working with SSR.
// const $img = useImage();
</script>

<template>
	<!-- v-img might cause issues with getting images in proper height and width, esp. in header bar therfor consider using plain htm img instead -->
	<!-- <v-img
    :height="height"
    :lazy-src="$img(src, { height, quality: 10 })"
    :src="$img(src, { height, quality: 100 })"
  >
    <template #placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        />
      </div>
    </template>
  </v-img> -->

	<img :height="height" :lazy-src="src" :src="src" />
</template>
