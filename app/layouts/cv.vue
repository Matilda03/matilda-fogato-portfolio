<script setup lang="ts">
const { data: entries } = useAsyncData('cv-entries-meta', () =>
  queryCollection('cv')
    .select('path', 'title', 'organization', 'startDate', 'endDate', 'location')
    .all()
)
</script>

<template>
  <UContainer>
    <UPage>
      <template #left>
        <UPageAside>
          <CvSidebarNav :entries="entries" />
        </UPageAside>
      </template>

      <slot />
    </UPage>
  </UContainer>
</template>
