<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('content'),
);

const appConfig = useAppConfig();
</script>

<template>
  <div class="flex justify-between px-4 py-4 mx-auto sm:px-8 max-w-2xl">
    <!-- Navigation -->
    <div class="text-zinc-700 dark:text-zinc-200">
      <NuxtLink
        v-for="link in navigation"
        :key="link.path" class="mr-6"
        :to="link.path"
        active-class="font-bold"
      >{{ link.title }}</NuxtLink>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="text-zinc-500 space-x-3 transition">
      <a
        v-if="appConfig.socials?.github"
        class="dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300"
        :href="`https://github.com/${appConfig.socials?.github}`"
        title="GitHub"
      >
        <Icon class="size-5" name="i-simple-icons-github" />
      </a>
      <a
          v-if="appConfig.socials?.linkedin"
          class="dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300"
          :href="`https://linkedin.com/${appConfig.socials?.linkedin}`" title="LinkedIn"
      >
        <Icon class="size-5" name="i-simple-icons-linkedin" />
      </a>
      <a
          v-if="appConfig.socials?.instagram"
          class="dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300"
          :href="`https://instagram.com/${appConfig.socials?.instagram}`" title="Instagram"
      >
        <Icon class="size-5" name="i-simple-icons-instagram" />
      </a>
      <ColorModeSwitch class="dark:text-zinc-100 hover:text-zinc-700 dark:hover:text-zinc-300" />
    </div>
  </div>
</template>
