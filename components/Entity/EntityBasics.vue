<template>
  <div>
    <v-row>

      <v-col>
        <div class="mt-3 py-4 mb-6">
          <v-avatar color="primary" size="56"
            style="position:absolute; z-index: -1; scale:5; left:40px; top:40px; opacity: 0.2;">
            <v-icon>{{ classIcon }}</v-icon>
          </v-avatar>
          <div class="py-2">
                <h1 class="text-h4 text-md-h3">
                  {{ title || $t('global.basics.title') }}
                </h1>
                <p class="text-overline">
                  {{ systemClassName }}
                </p>
          </div>
        </div>
        <v-content v-for="(description, index) in descriptions">
          <v-divider v-if="index > 0"></v-divider>
          <v-text class="text-body-1">
            {{ description.value }}
          </v-text>
        </v-content>
      </v-col>
    </v-row>


  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import classes from "../../assets/classes.json";
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

const classIcon = computed(() => {
  console.log(crmClass.value);
  if (systemClassName.value === t('components.entity.class_missing')) {
    return 'mdi-help';
  } else {
    console.log(classes.find(x => x.crmClass === crmClass.value)?.icon);
    return (classes.find(x => x.crmClass === crmClass.value)?.icon) ?? 'mdi-help';
  }
});

const primaryDescription = computed(
  () => {
    if (props.descriptions)
      return props.descriptions[0].value ?? t('components.entity.prim_description_missing');
    else
      return t('components.entity.prim_description_missing');
  }
)

const crmClass = computed(() => props.systemClass.substring(props.systemClass.indexOf(':') + 1, props.systemClass.indexOf(' ')))

const systemClassName = computed(
  () => {
    if (props.systemClass) {
      return classes.find(x => x.crmClass === crmClass.value)?.en
    }
    return t('components.entity.class_missing');
  }
)

</script>
