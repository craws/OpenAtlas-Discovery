<script setup lang="ts">import { Query } from '~~/types/query';
const emit = defineEmits<{
    (e: 'search', search: Query): void
}>();
const search = ref("");

const props = withDefaults(defineProps<{
    loading?: Boolean
}>(), {
    loading: () => false,
});

function handleSearch() {

    const query: Query = {
        search: !search.value ? [] : [{ entityName: [{ operator: 'like', values: [search.value], logicalOperator: 'and' }] }],
        view_classes: ["actor", "event", "place", "reference", "source"]
    };
    emit("search", query)
}
</script>
<template>
    <v-combobox :items="undefined" id="search-field" class="search-field" :loading="props.loading" clearable
        v-model="search" prepend-inner-icon="mdi-magnify" :hide-no-data="true" @change="handleSearch"
        @click:clear="handleSearch" :label="$t('search')" variant="solo">
        <template #appent-inner>
            hallo
        </template>
    </v-combobox>
</template>
