<template>
  <div>
    <v-row>
      <v-col>
        <div class="py-4">
          <v-avatar
            color="primary"
            size="56"
            style="position:absolute; z-index: -1; scale:5; left:40px; top:40px; opacity: 0.2;"
          >
            <v-icon>{{ classIcon }}</v-icon>
          </v-avatar>
          <div>
            <h1 class="text-h4 text-md-h3">
              {{ title || $t('global.basics.title') }}
            </h1>
            <p class="text-overline">
              {{ systemClassName }}
            </p>
          </div>
          <WhenDisplay
            v-if="props?.when"
            :loading="props.loading ?? undefined"
            :when="props.when"
          />
        </div>
        <div>
          <div v-for="(description, index) in descriptions" :key="(description ?? 'descr' + index)">
            <v-divider v-if="index > 0" />
            <p class="text-body-1">
              {{ description }}
            </p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import classes from '../../assets/classes.json';
import type { LinkedPlacesModelWhen } from '~~/composables/api';

const { t } = useI18n();

interface Props {
	loading?: boolean;
	title?: string;
	descriptions?: string[];
	systemClass?: string;
	when?: LinkedPlacesModelWhen;
}

const props = defineProps<Props>();

const classIcon = computed(() => {
  if (systemClassName.value === t('components.entity.class_missing')) {
    return 'mdi-help';
  }
  if (props.systemClass) {
    return (classes.find(x => x.systemClass === props.systemClass)?.icon) ?? 'mdi-help';
  }
});

const systemClassName = computed(
  () => {
    if (props.systemClass) {
      return classes.find(x => x.systemClass === props.systemClass)?.en;
    }
    return t('components.entity.class_missing');
  }
);

</script>
