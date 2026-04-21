<script setup lang="ts">
interface CvEntry {
  path: string
  title: string
  organization?: string
  startDate?: string
  endDate?: string
  location?: string
}

const props = defineProps<{
  entries: CvEntry[] | null | undefined
}>()

const route = useRoute()

// Group entries by the second path segment (e.g. 'experience', 'education')
// Insertion order preserves the numeric-prefix sort from Nuxt Content
const sections = computed(() => {
  const seen: string[] = []
  const map: Record<string, { label: string; items: CvEntry[] }> = {}

  for (const entry of (props.entries ?? [])) {
    const segment = entry.path.split('/')[2] ?? 'other'
    if (!map[segment]) {
      map[segment] = {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        items: []
      }
      seen.push(segment)
    }
    map[segment].items.push(entry)
  }

  return seen.map(s => map[s])
})

function formatDate(date?: string) {
  if (!date) return 'Present'
  const [year, month] = date.split('-')
  return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric'
  })
}
</script>

<template>
  <nav class="space-y-6 py-2">
    <div v-for="section in sections" :key="section.label" class="space-y-2">
      <!-- Section heading -->
      <p class="px-1 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        {{ section.label }}
      </p>

      <!-- Entry cards -->
      <div class="space-y-2">
        <NuxtLink
          v-for="entry in section.items"
          :key="entry.path"
          :to="entry.path"
          class="block rounded-xl p-3 border transition-all duration-150"
          :class="route.path === entry.path
            ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800'
            : 'bg-white dark:bg-neutral-800/60 border-neutral-100 dark:border-neutral-700/60 hover:border-neutral-200 dark:hover:border-neutral-600 hover:shadow-sm'"
        >
          <p
            class="text-sm font-semibold leading-snug"
            :class="route.path === entry.path
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-neutral-900 dark:text-white'"
          >
            {{ entry.title }}
          </p>

          <p v-if="entry.organization" class="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            {{ entry.organization }}
          </p>

          <p v-if="entry.startDate" class="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
            {{ formatDate(entry.startDate) }} – {{ formatDate(entry.endDate) }}
          </p>

          <p v-if="entry.location" class="flex items-center gap-1 text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
            <UIcon name="i-lucide-map-pin" class="w-3 h-3 shrink-0" />
            {{ entry.location }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
