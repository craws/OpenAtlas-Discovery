<script setup lang="ts">import { Query } from '~~/types/query';
const emit = defineEmits<{
    (e: 'search', search: Query): void
}>();
const search = ref("");


function handleSearch() {
    const query: Query = {
        search: [{ entityName: [{ operator: 'like', values: [search.value], logicalOperator: 'and' }] }],
        view_classes: ["actor", "event", "place", "reference", "source"]
    };
    emit("search", query)
}
</script>
<template>
    <v-text-field v-model="search" append-inner-icon="mdi-magnify" @click:appendInner="handleSearch"
        @keyup.enter="handleSearch" :label="$t('search')" variant="solo"></v-text-field>
</template>