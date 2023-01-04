
<script setup lang="ts">
</script>
<template>
  <v-app>
    <v-main>
      <HeaderBar />
      <v-divider />
      <nuxt-page />
    </v-main>
  </v-app>
</template>

<style>
.nav-item {
  text-decoration: none;
  transition: all 200ms ease-in-out;
  min-width: 50px;
}

.nav-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.language-menu .v-overlay__content {
  border-top-right-radius: 0 !important;
  border-top-left-radius: 0 !important;
}
</style>
