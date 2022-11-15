<template>
  <v-card class="mb-3">
    <v-card-title>
      {{ props.title }}
    </v-card-title>


    <v-divider/>
    <v-card-text class="mb-0 pb-0">
      <v-list>
        <template v-for="(item, index) in details">
          <template v-if="item && index < 3">
            <v-divider v-if="index > 0"/>
            <p
            :key="item.label">
              <nuxt-link :to="`/entity/${item.relationTo.split('/').at(-1)}`">{{ item.label }} </nuxt-link>
            </p>
          </template>
        </template>

        <div v-show="!showDetails && showExpandable">
          <v-divider/>
          <p>... {{ details.length - 3}} {{ $t('components.entity.detail.more')}} </p>
        </div>

        <v-expand-transition>
          <div v-show="showDetails">
            <template v-for="(item, index) in details" >
              <template v-if="item && index >= 3">
                <v-divider/>
                <p
                :key="item.label">
                  <nuxt-link :to="`/entity/${item.relationTo.split('/').at(-1)}`">{{ item.label }} </nuxt-link>
                </p>
              </template>
            </template>
          </div>
        </v-expand-transition>
      </v-list>
    </v-card-text>



    <v-divider v-if="showExpandable" v-show="!showDetails" class="closed-divider" transition="fade-transition"/>
    <v-card-actions>
      <v-spacer/>
      <v-btn
        v-if="showExpandable"
        variant="flat"
        :icon="showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="showDetails = !showDetails"
      ></v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>

</template>
<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    default: 'Detail'
  },
  details: {
    default: undefined,
  }
})

const showDetails = ref(false);

const showExpandable = computed(() => {
  if(props.details && Array.isArray(props.details) && props.details.length > 3) {
    return true;
  }
  else {
    return false;
  }
})

onMounted(
  () =>{
    console.log('details', props.details)
  }
)

</script>
<style scoped>
.closed-divider {
  transform: translate(0px,30px);
}

</style>
