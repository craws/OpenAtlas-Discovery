<template>
    <data-map :items="geoData" style="width:500px; height:500px;"></data-map>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { GeometryModel } from '~~/composables/api';
const props = defineProps<{
    geoData: GeometryModel;
}>();

const geoJson = useMapGeometryModelToGeoJsonObject(props.geoData);
</script>
