<template>
  <v-card class="mx-auto">
    <v-card-title class="detail-title">
      {{ props.title }}
    </v-card-title>

    <v-divider />
    <v-card-text class="mb-0 pb-0">
      <v-list>
        <template v-for="(item, index) in details">
          <span v-if="item && index < 3" :key="item.id">
            <v-divider v-if="index > 0" />
            <p>
              <b v-if="item?.subheader"> {{ item?.subheader }}: </b>
              <nuxt-link :to="`/entity/${item?.id}`"
                >{{ item.label }}
              </nuxt-link>
            </p>
          </span>
        </template>

        <div v-show="!showDetails && showExpandable">
          <v-divider />
          <p>
            ... {{ details.length - 3 }}
            {{ $t("components.entity.detail.more") }}
          </p>
        </div>

        <v-expand-transition>
          <div v-show="showDetails">
            <template v-for="(item, index) in details">
              <span v-if="item && index >= 3" :key="item.id">
                <v-divider />
                <p>
                  <b v-if="item?.subheader"> {{ item?.subheader }}: </b>
                  <nuxt-link :to="`/entity/${item?.id}`">
                    {{ item.label }}
                  </nuxt-link>
                </p>
              </span>
            </template>
          </div>
        </v-expand-transition>
      </v-list>
    </v-card-text>

    <v-divider
      v-if="showExpandable"
      v-show="!showDetails"
      class="closed-divider"
      transition="fade-transition"
    />
    <v-card-actions>
      <v-spacer />
      <v-btn
        v-if="showExpandable"
        variant="flat"
        :icon="showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showDetails = !showDetails"
      />
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { type DetailItem } from "~~/types/entityDetailTypes";

const props = defineProps({
  title: {
    type: String,
    default: "Detail",
  },
  details: {
    type: Array<DetailItem>,
    default: null,
  },
});

const showDetails = ref(false);

const showExpandable = computed(() => {
  if (
    props.details &&
    Array.isArray(props.details) &&
    props.details.length > 3
  ) {
    return true;
  } else {
    return false;
  }
});
</script>

<style scoped>
.closed-divider {
  transform: translate(0px, 30px);
}
.detail-title::first-letter {
  text-transform: capitalize;
}
</style>
