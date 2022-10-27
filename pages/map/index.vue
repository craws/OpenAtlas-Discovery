<script setup lang="ts">import { Query } from '~~/types/query';

const { $api } = useNuxtApp();

const query = ref({
    view_classes: ["actor", "event", "place", "reference", "source"],
    limit:0,
    show:'geometry',
    format:'geojson',
    search:undefined
})
const { data, pending, error, refresh } = await useAsyncData(() => $api.query.queryList(query.value));
onMounted(() => {
    refresh();
});

interface CardContent {
    title: string
    id?: number
    subtitle?: string
    text?: string
}
const cardContent = reactive<CardContent>({ title: '' })
const items = computed(() => data?.value?.data?.results?.[0].features || [])
function handlePopup(e: L.LeafletMouseEvent) {
    console.log(e)
    cardContent.title = e?.target?.feature?.properties?.name ?? ''
    cardContent.subtitle = e?.target?.feature?.properties?.objectType
    cardContent.id = e?.target?.feature?.properties?.['@id'];
    cardContent.text = e?.target?.feature?.geometry?.description
}

function updateQuery(newQuery: Query){
    query.value.search=newQuery.search.map(x => JSON.stringify(x));
    refresh();
}
</script>
<template>
    <div>
        <div style="position:relative; overflow: hidden;">
            <search class="search" @search="updateQuery"></search>
            <v-card width="300px" class="popup" :class="{ move: !cardContent.id }" position="absolute">
                <v-card-title>
                    <div class="d-flex justify-space-between">
                        <p class="text-wrap">
                            {{ cardContent.title }}
                        </p>
                        <v-btn @click="cardContent.id = undefined" icon="mdi-close" variant="text" size="small" color="grey"></v-btn>
                    </div>
                </v-card-title>
                <v-card-subtitle>
                    <span>{{ cardContent.subtitle }}</span>
                </v-card-subtitle>
                <v-card-text style="max-height:calc(100vh - 320px);white-space: pre-line" class="scroll">
                    <div>
                        {{ cardContent.text }}
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-btn :to="`/entity/${cardContent.id}`" variant="text">{{ $t('more details') }}</v-btn>
                </v-card-actions>
            </v-card>
            <data-map @item-clicked="handlePopup" :items="items"
                style="height:calc(100vh - 64px);">
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

.search{
    position:absolute;
    z-index:500;
    width: 60%;
    left:0;
    right:0;
    margin:auto;
    top:20px
}
</style>