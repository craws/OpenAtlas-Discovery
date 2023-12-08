<script setup lang="ts">
defineProps({
	picture: {
		type: String,
		default: "",
	},
	name: {
		type: String,
		default: "Lorem Ipsum",
	},
	role: {
		type: String,
		default: "",
	},
});
</script>

<template>
	<VCard class="my-4 px-2">
		<div class="d-flex flex-no-wrap">
			<VAvatar
				v-if="picture && picture !== ''"
				size="150"
				color="primary"
				class="my-2"
				:image="picture"
			>
				<VNuxtImage :src="picture" :alt="name + ' profile picture'" />
			</VAvatar>
			<div class="mx-0 text-left">
				<VCardTitle>
					{{ name }}
				</VCardTitle>
				<VCardSubtitle v-if="role && role !== ''">
					{{ role }}
				</VCardSubtitle>
				<VCardText>
					<ContentSlot :use="$slots.default" unwrap="p" />
				</VCardText>
			</div>
		</div>
	</VCard>
</template>
