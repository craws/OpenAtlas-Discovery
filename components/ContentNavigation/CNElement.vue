<template>
  <template v-if="isDirectory">
    <v-btn>
      {{ navItem.title }}
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in navItem.children"
            :key="index"
            :value="index"
          >
            <ContentNavigationCNElement :nav-item="item" />
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </template>
  <template v-else>
    <v-list-item-title @click="navigateTo(navItem._path)">
      {{ navItem.navTitle || navItem.title }}
    </v-list-item-title>
  </template>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
import { NavItem } from '@nuxt/content/dist/runtime/types';

// Add a prop that takes a NavigationItem

const props = defineProps<{
  navItem: NavItem;
}>();

const isDirectory = computed(() => {
  return props.navItem.children !== undefined;
});

const navItem = computed(() => {
  return props.navItem;
});

</script>
