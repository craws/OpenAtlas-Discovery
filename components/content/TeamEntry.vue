<template>
  <v-card class="my-4 px-2">
    <div class="d-flex flex-no-wrap">
      <v-avatar v-if="picture && picture !== ''" size="150" color="primary" class="my-2" :image="picture">
        <v-nuxt-image :src="picture" :alt="name + ' profile picture'" />
      </v-avatar>
      <div class="mx-0 text-left">
        <v-card-title>
          {{ name }}
        </v-card-title>
        <v-card-subtitle v-if="role && role !== ''">
          {{ role }}
        </v-card-subtitle>
        <v-card-text>
          <ContentSlot :use="$slots.default" unwrap="p" />
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>
<script setup lang="ts">

defineProps({
  picture: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: 'Lorem Ipsum'
  },
  role: {
    type: String,
    default: ''
  }
});

</script>
