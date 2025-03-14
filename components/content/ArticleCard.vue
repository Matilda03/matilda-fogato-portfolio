<script setup lang="ts">
defineProps({
  href: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  }
})
</script>

<template>
  <div class="prose dark:prose-invert prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 hover:prose-a:text-primary-400 prose-a:font-normal prose-a:no-underline prose-a:border-dashed prose-a:border-b hover:prose-a:border-solid hover:prose-a:border-primary-400">
  <div class="relative max-w-48">
    <NuxtLink :to="href" :external="external">
      <img :src="image" class="object-cover w-48 h-48 z-0"/>
      <h3 class="absolute mx-auto inset-x-0 bottom-0 z-10 prose-invert ">{{title}}</h3>
    </NuxtLink>
  </div>
  </div>

</template>

<style scoped>

</style>