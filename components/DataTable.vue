<script setup lang="ts">
interface Header {
	text: string;
	align?: "center" | "left" | "right";
	sortable?: boolean;
	value: string;
}
interface Props {
	headers: Array<Header>;
	items: Array<Object>;
	loading?: boolean;
	height?: string;
	options: {
		page: number;
		itemsPerPage: number;
		itemsLength: number;
	};
}
withDefaults(defineProps<Props>(), {
	loading: () => false,
	height: () => "100%",
});
</script>

<template>
	<!-- eslint-disable vue/no-mutating-props -->
	<div>
		<VProgressLinear :active="loading" indeterminate />
		<VTable :height="`calc( ${height} - 84px)`" fixed-header>
			<thead>
				<tr>
					<th
						v-for="header in headers"
						:key="header.value"
						class="text-capitalize"
						:class="`text-${header.align || 'left'}`"
					>
						{{ $t(`global.entity.${header.text}`) }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in items" :key="index">
					<td
						v-for="header in headers"
						:key="header.value"
						:class="`text-${header.align || 'left'}`"
					>
						<slot :name="header.value" :item="item" :value="useSafeRead(item, header.value)">
							{{ useSafeRead(item, header.value) }}
						</slot>
					</td>
				</tr>
			</tbody>
		</VTable>
		<VDivider />
		<div class="d-flex align-center justify-end">
			<div class="text-caption">
				{{ options.itemsPerPage * options.page - options.itemsPerPage + 1 }}-{{
					options.itemsPerPage * options.page
				}}
				{{ $t("global.basics.of") }} {{ options.itemsLength }}
			</div>
			<div>
				<VBtn
					:disabled="options.page === 1"
					size="small"
					variant="plain"
					icon
					@click="options.page--"
				>
					<VIcon>mdi-chevron-left</VIcon>
				</VBtn>
			</div>
			<div>
				<VBtn
					:disabled="options.itemsLength <= options.page * options.itemsPerPage"
					size="small"
					variant="plain"
					icon
					@click="options.page++"
				>
					<VIcon>mdi-chevron-right</VIcon>
				</VBtn>
			</div>
		</div>
	</div>
</template>
