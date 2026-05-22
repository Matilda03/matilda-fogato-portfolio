<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const { header } = useAppConfig()

const menuOpen = ref(false)

// Close menu on route change
const route = useRoute()
watch(() => route.path, () => { menuOpen.value = false })
</script>

<template>
  <div class="sticky top-4 z-40 flex justify-center px-4">
    <!-- Pill nav -->
    <div class="flex items-center gap-1 px-4 sm:px-6 py-3 rounded-full bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border border-white/20 dark:border-neutral-700/30 shadow-lg shadow-neutral-900/5 dark:shadow-black/20">

      <!-- Brand: chip mark only on mobile, full lockup on sm+ -->
      <NuxtLink
        :to="header?.to || '/'"
        class="shrink-0 mr-2 flex items-center text-neutral-900 dark:text-neutral-100 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors duration-200"
        @click="menuOpen = false"
      >
        <!-- Wordmark lockup on sm+ -->
        <span class="hidden sm:inline-flex items-center">
          <ChipMark :size="22" animated wordmark />
        </span>
        <!-- Mark only on mobile — same w-7 h-7 footprint as the icon buttons -->
        <span class="inline-flex sm:hidden items-center justify-center w-7 h-7">
          <ChipMark :size="18" animated />
        </span>
      </NuxtLink>

      <!-- Divider + nav links — desktop only -->
      <div class="hidden sm:flex items-center gap-1">
        <div class="w-px h-6 bg-neutral-200/50 dark:bg-neutral-700/50 mx-1" />
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
      </div>

      <!-- Divider -->
      <div class="w-px h-6 bg-neutral-200/50 dark:bg-neutral-700/50 mx-1" />

      <!-- Right Actions (always visible) -->
      <div class="flex items-center gap-1">
        <UColorModeButton v-if="header?.colorMode" />

        <!-- Social links — desktop only -->
        <template v-if="header?.links">
          <UButton
            v-for="(link, index) of header.links"
            :key="index"
            class="hidden sm:inline-flex"
            v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
          />
        </template>

        <!-- Hamburger — mobile only -->
        <button
          class="inline-flex sm:hidden items-center justify-center w-7 h-7 rounded-full text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 transition-all duration-200"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <UIcon :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        class="sm:hidden absolute top-full mt-2 left-0 right-0 mx-4 rounded-2xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-white/20 dark:border-neutral-700/30 shadow-xl shadow-neutral-900/10 dark:shadow-black/30 overflow-hidden"
      >
        <nav class="flex flex-col p-2">
          <NuxtLink
            to="/"
            class="px-4 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-xl transition-all duration-200"
            @click="menuOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/projects"
            class="px-4 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-xl transition-all duration-200"
            @click="menuOpen = false"
          >
            Projects
          </NuxtLink>
          <NuxtLink
            to="/work"
            class="px-4 py-3 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/50 rounded-xl transition-all duration-200"
            @click="menuOpen = false"
          >
            Work Experience
          </NuxtLink>

          <!-- Social links in mobile menu -->
          <div v-if="header?.links" class="flex items-center gap-2 px-4 py-3 border-t border-neutral-100 dark:border-neutral-800 mt-1">
            <UButton
              v-for="(link, index) of header.links"
              :key="index"
              v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
            />
          </div>
        </nav>
      </div>
    </Transition>
  </div>
</template>
