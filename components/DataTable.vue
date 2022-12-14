<script setup lang="ts">

interface Header {
    text: string
    align?: 'left' | 'center' | 'right'
    sortable?: boolean
    value: string
}
interface Props {
    headers: Header[];
    items: Object[];
    loading?: Boolean;
    height?: string;
    options: {
        page: number,
        itemsPerPage: number,
        itemsLength: number,
    }
}
const props = withDefaults(defineProps<Props>(),
    {
        loading: () => false
    })
</script>
<template>
    <div>
        <v-progress-linear :active="loading" indeterminate></v-progress-linear>
        <v-table :height="`calc( ${height} - 84px)`" fixed-header>
            <thead>
                <tr>
                    <th v-for="header in headers" :key="header.value" class="text-capitalize" :class="`text-${header.align || 'left'}`">
                        {{$t(`global.entity.${header.text}`)}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items" :key="index">
                    <td v-for="header in headers" :key="header.value" :class="`text-${header.align || 'left'}`">
                        <slot :name="header.value" :item="item" :value="useSafeRead(item,header.value)">
                            {{ useSafeRead(item,header.value)}}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </v-table>
        <v-divider></v-divider>
        <div class="d-flex align-center justify-end">
            <div class="text-caption">
                {{options.itemsPerPage * options.page - options.itemsPerPage + 1 }}-{{options.itemsPerPage *
                options.page}} {{$t("global.basics.of")}} {{options.itemsLength}}
            </div>
            <div>
                <v-btn @click="options.page--" :disabled="options.page===1" size="small" variant="plain" icon>
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </div>
            <div>
                <v-btn @click="options.page++" :disabled="options.itemsLength <= options.page * options.itemsPerPage"
                    size="small" variant="plain" icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>
