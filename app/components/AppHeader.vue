<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { header } = useAppConfig()
</script>

<template>
  <div class="sticky top-4 z-40 flex justify-center px-4">
    <!-- Pill-shaped Liquid Glass Navigation Bar -->
    <div class="flex items-center gap-1 px-6 py-3 rounded-full bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border border-white/20 dark:border-neutral-700/30 shadow-lg shadow-neutral-900/5 dark:shadow-black/20">
      <!-- Brand Logo -->
      <NuxtLink
        :to="header?.to || '/'"
        class="shrink-0 mr-2 text-base font-semibold text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-200"
      >
        Matilda Fogato
      </NuxtLink>

      <!-- Divider -->
      <div class="w-px h-6 bg-neutral-200/50 dark:bg-neutral-700/50 mx-1" />

      <!-- Central Navigation Links -->
      <nav class="flex items-center gap-1">
        <NuxtLink
          to="/"
          class="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-full transition-all duration-200"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/projects"
          class="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-full transition-all duration-200"
        >
          Projects
        </NuxtLink>
        <NuxtLink
          to="/work"
          class="px-3 py-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-full transition-all duration-200"
        >
          Work Experience
        </NuxtLink>
      </nav>

      <!-- Divider -->
      <div class="w-px h-6 bg-neutral-200/50 dark:bg-neutral-700/50 mx-1" />

      <!-- Right Actions -->
      <div class="flex items-center gap-1">
        <UColorModeButton v-if="header?.colorMode" />

        <template v-if="header?.links">
          <UButton
            v-for="(link, index) of header.links"
            :key="index"
            v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          />
        </template>
      </div>
    </div>
  </div>
</template>
