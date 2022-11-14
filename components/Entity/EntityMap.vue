<template>
    <v-card
    class="mx-auto my-6"
    style="min-width: 400px; min-height: 400px; max-width: 600px; max-height:750;">
        <data-map :items="geoData" style="min-width: 400px; min-height: 400px; max-width: 600px; max-height:500;"></data-map>
    </v-card>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { GeometryModel } from '~~/composables/api';
const props = defineProps<{
    geoData: GeometryModel;
}>();

const geoJson = useMapGeometryModelToGeoJsonObject(props.geoData);
</script>
