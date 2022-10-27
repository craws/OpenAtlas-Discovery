<template>
    <div>
        <div class="text-center" v-if="pending">
            <v-progress-circular
            indeterminate
            color="primary"
            ></v-progress-circular>
        </div>
        <v-row
        :align-self="'center'"
        class="pt-3 pl-3"
        v-else>
            <v-col>
                <h2>
                    {{  title }}
                </h2>
                <v-text>
                    {{primaryDescription}}
                </v-text>
            </v-col>
        </v-row>

    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useI18n} from 'vue-i18n';

const { $api } = useNuxtApp();
const route = useRoute();
const { t } = useI18n();

const entityID = Number(route.params.id);
const { data, pending, error, refresh } = await useAsyncData(() => $api.entity.entityDetail( entityID, {
    download: false,
}))

// Entity Variables
const type = computed(() => data.value?.data?.type);

const features = computed( () => data?.value?.data?.features ?? void 0);

const title = computed(() => features.value?.[0]?.properties?.title ?? t('entity.title'));

const primaryDescription = computed(() => {
        return features.value?.[0]?.descriptions?.[0]?.value ?? t('entity.prim_description_missing');
        // Using the Optional check operator '?' to make sure every element of the chain exists, instead of lengthy if clause.
        // (?. is needed for arrays before specifying the index)
})


// Basic Functions

onMounted(() => {
    refresh();
});

function logBasicEntityInfo() {
    console.log('ID: ', route.params.id);
    console.log('Data: ', data.value);
}

</script>



function $t(arg0: string): any {
  throw new Error('Function not implemented.');
}

function $t(arg0: string): any {
  throw new Error('Function not implemented.');
}
