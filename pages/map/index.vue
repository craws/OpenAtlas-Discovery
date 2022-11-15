<script setup lang="ts">import { Query } from '~~/types/query';
import { GeoJsonObject } from "geojson";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const { $api } = useNuxtApp();

const query = ref({
    view_classes: ["actor", "event", "place", "reference", "source"],
    limit: 0,
    format: 'geojson',
    search: undefined
})
const { data, pending, error, refresh } = await useAsyncData(() => $api.query.queryList(query.value));
onMounted(() => {
    refresh();
});

interface FeatureContent {
    locationTitle: string
    objectTitle: string
    locationDescription: string
    objectDescription: string
    id?: number
}
const featureContent = reactive<FeatureContent>({
    locationTitle: '',
    objectTitle: '',
    locationDescription: '',
    objectDescription: '',
});

const items = computed(() => data?.value?.data?.results?.[0].features || [])
function handlePopup(e: L.LeafletMouseEvent) {
    featureContent.objectTitle = e?.target?.feature?.properties?.name ?? ''
    featureContent.objectDescription = e?.target?.feature?.properties?.description ?? ''
    featureContent.locationTitle = e?.target?.feature?.geometry?.title ?? ''
    featureContent.locationDescription = e?.target?.feature?.geometry?.description ?? ''
    featureContent.id = e?.target?.feature?.properties?.['@id'];
}

function updateQuery(newQuery: Query) {
    query.value.search = newQuery.search.map(x => JSON.stringify(x));
    refresh();
}

useHead({
    title: t('global.basics.map')
})
</script>
<template>
    <div>
        <div style="position:relative; overflow: hidden;">
            <search-field class="search" :loading="pending" @search="updateQuery"></search-field>
            <v-card width="300px" class="popup" :class="{ move: !featureContent.id }" position="absolute">
                <v-btn @click="featureContent.id = undefined" class="close-btn" icon="mdi-close" variant="text"
                    size="small" color="grey"></v-btn>
                <v-card-subtitle class="mt-3">
                    <div class="d-flex justify-space-between">
                        <span>{{ featureContent.locationTitle }}</span>

                    </div>
                </v-card-subtitle>
                <v-card-title class="pt-0">
                    <span class="text-wrap">
                        {{ featureContent.objectTitle }}
                    </span>

                </v-card-title>

                <v-card-text style="max-height:calc(100vh - 320px);white-space: pre-line" class="scroll">
                    <div>
                        <p v-if="!!featureContent.locationDescription">{{ featureContent.locationDescription }}</p>
                        <p v-else>{{ featureContent.objectDescription }}</p>

                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn :to="`/entity/${featureContent.id}`" variant="text">{{ $t('global.basics.more details') }}</v-btn>
                </v-card-actions>
            </v-card>
            <data-map @item-clicked="handlePopup" :items="items as GeoJsonObject[]" style="height:calc(100vh - 64px);">
            </data-map>

        </div>

    </div>
</template>

<style scoped>
.popup {
    transition: all 100ms ease-in-out;
    right: 20px;
    top: 100px;
    z-index: 500
}

.popup.move {
    translate: 500px 0px;
}

.scroll {
    overflow-y: auto
}

.search {
    position: absolute;
    z-index: 500;
    width: 60%;
    left: 0;
    right: 0;
    margin: auto;
    top: 20px
}

.close-btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 5;
}
</style>
