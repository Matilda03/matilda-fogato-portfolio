<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const { data: project } = await useAsyncData(`project-${slug}`, () =>
  queryCollection('projects').path(`/projects/${slug}`).first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

useSeoMeta({
  title: project.value.title,
  ogTitle: project.value.title,
  description: project.value.description,
  ogDescription: project.value.description
})
</script>

<template>
  <UContainer class="py-12 max-w-3xl">
    <!-- Back link -->
    <NuxtLink
      to="/projects"
      class="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mb-8"
    >
      <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
      Back to all projects
    </NuxtLink>

    <!-- Hero image or gradient -->
    <div class="w-full aspect-[16/7] rounded-2xl overflow-hidden mb-8 shadow-lg">
      <NuxtImg
        v-if="project?.image"
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        :class="`w-full h-full bg-gradient-to-br ${project?.gradient || 'from-sky-400 to-blue-600'}`"
      />
    </div>

    <!-- Header -->
    <div class="space-y-4 mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
        {{ project?.title }}
      </h1>

      <p
        v-if="project?.description"
        class="text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed"
      >
        {{ project.description }}
      </p>

      <!-- Tags -->
      <div v-if="project?.tags?.length" class="flex flex-wrap gap-2">
        <UBadge
          v-for="tag in project.tags"
          :key="tag"
          :label="tag"
          variant="soft"
          size="md"
        />
      </div>

      <!-- External links -->
      <div v-if="project?.github || project?.link" class="flex gap-3 pt-1">
        <UButton
          v-if="project.github"
          :to="project.github"
          target="_blank"
          icon="i-simple-icons-github"
          label="GitHub"
          variant="outline"
          size="sm"
        />
        <UButton
          v-if="project.link"
          :to="project.link"
          target="_blank"
          icon="i-lucide-external-link"
          label="Live site"
          variant="outline"
          size="sm"
        />
      </div>
    </div>

    <!-- Divider -->
    <USeparator class="mb-8" />

    <!-- Markdown content -->
    <div class="prose dark:prose-invert max-w-none">
      <ContentRenderer :value="project" />
    </div>
  </UContainer>
</template>
