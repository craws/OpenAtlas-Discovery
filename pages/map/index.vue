<script setup lang="ts">
const { $api } = useNuxtApp();
const { data, pending, error, refresh } = await useAsyncData(() => $api.geometricEntities.geometricEntitiesList());
onMounted(() => refresh());

interface CardContent {
    title: string
    id?: number
    subtitle?: string
    text?: string
}
const cardContent = reactive<CardContent>({ title: '' })

function handlePopup(e: L.LeafletMouseEvent) {
    cardContent.title = e?.target?.feature?.properties?.name ?? ''
    cardContent.subtitle = e?.target?.feature?.properties?.objectType
    cardContent.id = e?.target?.feature?.properties?.objectId;
    cardContent.text = e?.target?.feature?.properties?.objectDescription
}
</script>
<template>
    <div>
        <div style="position:relative; overflow: hidden;">
            <v-card width="300px"  class="popup" :class="{ move: !cardContent.id}"
                position="absolute" top="10px" style="right:20px; top:20px;z-index:500" :title="cardContent.title"
                :subtitle="cardContent.subtitle" >
            <v-card-text style="max-height:70vh" class="scroll">
                <div>
                    {{cardContent.text}}
                </div>
            </v-card-text>
            <v-card-actions>
                <v-btn :to="`/entity/${cardContent.id}`" variant="text">{{$t('more details')}}</v-btn>
            </v-card-actions>
            </v-card>
            <my-map @item-clicked="handlePopup" :items="data?.data?.features || []" style="height:calc(100vh - 64px);">
            </my-map>

        </div>

    </div>
</template>

<style scoped>
.popup {
    transition: all 100ms ease-in-out;
    right: 20px;
    top: 20px;
    z-index: 500
}

.popup.move {
    translate: 500px 0px;
}

.scroll {
    overflow-y: auto
}
</style>