<script setup lang="ts">
definePageMeta({ layout: 'cv' })

const route = useRoute()

// This is the only blocking fetch — the page content itself must be ready to render
const { data: entry } = await useAsyncData(`cv-${route.path}`, () =>
  queryCollection('cv').path(route.path).first()
)

if (!entry.value) {
  throw createError({ statusCode: 404, statusMessage: 'Entry not found', fatal: true })
}

// Non-blocking: prev/next links appear after the main content loads
const { data: surround } = useAsyncData(`cv-surround-${route.path}`, () =>
  queryCollectionItemSurroundings('cv', route.path, { fields: ['description'] })
)

useSeoMeta({
  title: entry.value.title,
  ogTitle: entry.value.title,
  description: entry.value.description
})
</script>

<template>
  <UPage v-if="entry">
    <UPageHeader
      :title="entry.title"
      :description="entry.description"
    />

    <UPageBody>
      <div class="flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-500 dark:text-neutral-400 mb-8 -mt-4">
        <span v-if="entry.organization" class="font-medium text-neutral-700 dark:text-neutral-300">
          {{ entry.organization }}
        </span>
        <span v-if="entry.startDate">
          {{ entry.startDate.slice(0, 7).replace('-', ' / ') }} –
          {{ entry.endDate ? entry.endDate.slice(0, 7).replace('-', ' / ') : 'Present' }}
        </span>
        <span v-if="entry.location" class="flex items-center gap-1">
          <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
          {{ entry.location }}
        </span>
      </div>

      <ContentRenderer :value="entry" />

      <USeparator v-if="surround?.length" />
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="entry.body?.toc?.links?.length" #right>
      <UContentToc :links="entry.body.toc.links" />
    </template>
  </UPage>
</template>
