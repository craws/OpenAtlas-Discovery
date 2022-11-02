<template>
    <div>
        <div
        v-if="pending || !wasMounted"
        style="
            width: 100%;
            min-height: 100vh;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center ">
            <v-progress-circular
            indeterminate
            color="primary"
            ></v-progress-circular>
        </div>
        <v-card
        v-else
        class="mx-2 mt-2 px-4 py-2 basecard"
        >
            <v-row>
                <v-col>
                    <h2>
                        {{  title }}
                    </h2>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
            <v-row
            :align-self="'center'">
                <v-col>
                    <v-text>
                        {{primaryDescription}}
                    </v-text>
                </v-col>
                <v-col>

                </v-col>
            </v-row>
        </v-card>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n} from 'vue-i18n';

const { $api } = useNuxtApp();
const route = useRoute();
const { t } = useI18n();

const entityID = Number(route.params.id);
let wasMounted = ref(false);

const { data, pending, error, refresh } = await useAsyncData(() => $api.entity.entityDetail( entityID, {
    download: false,
}))

// Entity Variables
const type = computed(() => data.value?.data?.type);

const features = computed( () => data?.value?.data?.features ?? void 0);

const title = computed(() => features.value?.[0]?.properties?.title ?? t('global.basics.title'));

const primaryDescription = computed(() => {
        return features.value?.[0]?.descriptions?.[0]?.value ?? t('components.entity.prim_description_missing');
        // Using the Optional check operator '?' to make sure every element of the chain exists, instead of lengthy if clause.
        // (?. is needed for arrays before specifying the index)
})


// Basic Functions

onMounted(() => {
    wasMounted.value = true;
    refresh();
});

function logBasicEntityInfo() {
    console.log('ID: ', route.params.id);
    console.log('Data: ', data.value);
}

</script>
<style scoped lang="scss">


</style>
