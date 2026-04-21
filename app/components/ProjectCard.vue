<template>
  <NuxtLink
    :to="to"
    class="group block bg-white dark:bg-neutral-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <!-- Image / Gradient placeholder -->
    <div class="relative w-full aspect-[4/3] overflow-hidden">
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div
        v-else
        :class="`w-full h-full bg-linear-to-br ${gradient || 'from-sky-400 to-blue-600'} group-hover:scale-105 transition-transform duration-500`"
      />
    </div>

    <!-- Card body -->
    <div class="p-5 space-y-3">
      <h3 class="text-base font-semibold text-neutral-900 dark:text-white leading-snug">
        {{ title }}
      </h3>

      <p
        v-if="description"
        class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2"
      >
        {{ description }}
      </p>

      <div v-if="tags?.length" class="flex flex-wrap gap-1.5 pt-1">
        <UBadge
          v-for="tag in tags"
          :key="tag"
          :label="tag"
          variant="soft"
          size="sm"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  to: string
  description?: string
  image?: string
  gradient?: string
  tags?: string[]
}>()
</script>
