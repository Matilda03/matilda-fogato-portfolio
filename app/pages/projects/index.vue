<script setup lang="ts">
const { data: page } = await useAsyncData('projects', () => queryCollection('workpage').first())
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: projects } = await useAsyncData('project-list', () =>
  queryCollection('projects').all()
)

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  titleTemplate: '',
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/docs-light.png'
})
</script>

<template>
  <UContainer class="py-12 space-y-12">
    <!-- Page intro from projects.md -->
    <ContentRenderer
      v-if="page"
      :value="page"
      :prose="false"
    />

    <!-- Projects grid -->
    <section v-if="projects?.length" class="space-y-6">
      <div class="relative border-b border-default py-8">
        <h1 class="text-neutral-900 dark:text-white text-3xl sm:text-4xl text-pretty font-bold text-highlighted">
          My Projects
        </h1>
        <span class="text-lg text-pretty text-muted mt-4">Here are some of the projects that I'm most proud of, along with the technologies I used to build them.</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in projects"
          :key="project.path"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :gradient="project.gradient"
          :tags="project.tags"
          :to="project.path"
        />
      </div>
    </section>
  </UContainer>
</template>
