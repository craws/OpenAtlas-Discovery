<template>
  <v-card
  class="mx-auto my-3"
  max-width="30vw">
    <v-card-title>
      {{ props.title }}
    </v-card-title>


    <v-expand-transition>
      <div v-show="showDetails">
        <v-divider></v-divider>

        <v-card-text>
          <v-list>
            <template v-for="(item, index) in details">
              <v-subheader
                v-if="item"
                :key="item.label"
              >
                <nuxt-link :to="`/entity/${item.relationTo.split('/').at(-1)}`">{{ item.label }} </nuxt-link>
              </v-subheader>

              <v-divider/>


            </template>
          </v-list>
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-card-actions>
      <v-btn
          :icon="showDetails ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="showDetails = !showDetails"
      ></v-btn>
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

const showDetails = ref(true);

onMounted(
  () =>{
    console.log('details', props.details)
  }
)

</script>
