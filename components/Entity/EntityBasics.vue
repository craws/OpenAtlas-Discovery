<template>
  <div>
    <v-row>
      <v-col cols="1">
        <v-avatar
          color="primary"
          size="56"
          icon="mdi-account"
        >
        </v-avatar>
      </v-col>
      <v-col>
        <v-row no-gutters>
          <v-col>
            <h1>
              {{  title || $t('global.basics.title')}}
            </h1>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col>
            <p>
              {{ systemClassName }}
            </p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
    :align-self="'center'">
        <v-col>
          <v-content v-for="(description, index) in descriptions">
            <v-divider v-if="index > 0" ></v-divider>
            <v-text >
              {{ description.value }}
            </v-text>
          </v-content>
        </v-col>
        <v-col>

        </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { DescriptionModel } from '~~/composables/api';

const { t } = useI18n();

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  title: {
    type: String || undefined,
    default: undefined
  },
  descriptions: {
    type: Array<DescriptionModel>,
    default: undefined
  },
  systemClass: {
    type: String,
    default: ''
  }
})

const primaryDescription = computed(
  () => {
    if(props.descriptions)
      return props.descriptions[0].value ?? t('components.entity.prim_description_missing');
    else
      return t('components.entity.prim_description_missing');
  }
)

const systemClassName = computed(
  () => {
    if(props.systemClass){
      return props.systemClass.substring(props.systemClass.indexOf(' '))
    }
    return t('components.entity.class_missing');
  }
)

</script>
