<script setup lang="ts">
import headers from "../../assets/tableheaders.json";
import classes from "../../assets/classes.json";
const { $api } = useNuxtApp();


const { data, pending, error, refresh } = await useAsyncData(() => $api.query.queryList({
    view_classes: ["actor", "event", "place", "reference", "source"],
    page: options.page,
    limit: options.itemsPerPage
}));
const itemsLength = computed(() => data?.value?.data.pagination.entities);
const options = reactive({ page: 1, itemsPerPage: 20, itemsLength })
watch(() => options.page, () => refresh());

onMounted(() => {
    refresh();
})
const icons = {
    person: 'mdi-account',
    group: 'mdi-account-group',
    activity: 'mdi-chevron-triple-right',
    edition: 'mdi-alphabet-a-box-outline',
    acquisition: "mdi-calendar",

}
</script>

<template>
    <data-table :loading="pending" height="calc(100vh - 64px)" density="compact" :headers="headers"
        :items="data?.data?.results ?? []" :options="options">
        <template #features[0].systemClass="{ value }">
            <v-tooltip :text="$t(value)">
                <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">{{ classes.find(x => x.systemClass === value)?.icon }}</v-icon>
                </template>
            </v-tooltip>
        </template>
        <template #features[0].properties.title="{ item, value }">
            <nuxt-link :to="`/entity/${item.features[0]['@id'].split('/').at(-1)}`">{{ value }} </nuxt-link>
        </template>
        <template #features[0].when.timespans[0].start.earliest="{ value }">
            {{ useFormatDateTime(value) }}
        </template>
        <template #features[0].when.timespans[0].end.earliest="{ value }">
            {{ useFormatDateTime(value) }}
        </template>
    </data-table>
</template>