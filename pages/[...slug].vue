<template>
  <v-sheet height="calc(100vh - 65px)" class=" d-flex justify-center pt-5">
    <v-container class="text-center" data-test="main-content-renderer">
      <ContentDoc>
        <template #not-found>
          <h1>Document not found</h1>
          <NuxtLink to="/">
            {{ $t('global.basics.backHome') }}.
          </NuxtLink>
        </template>
        <template #empty>
          <h1>Document is empty</h1>
          <NuxtLink to="/">
            {{ $t('global.basics.backHome') }}.
          </NuxtLink>
        </template>
      </ContentDoc>
    </v-container>
  </v-sheet>
</template>
