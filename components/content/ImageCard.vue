<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ImageCard.vue"
})
</script>

<template>
<span class="prose dark:prose-invert">
  <div class="columns-2">
    <div class="column text-sm">
      <p class="mt-0 mb-2.5">I'm a passionate computer science student with experience in front-end development, AI, and Digital Twins. I love creating intuitive designs and solving challenging problems.</p>
      <p class="mt-0 mb-2.5">My mission is to design simple, user-friendly experiences that demystify the world of big data. To me, developing more explainable models is the only way forward.</p>
      <p class="mt-0 mb-2.5">When I’m not coding, I’m probably exploring new tech, reading a psychology book, or playing guitar somewhere in Spain.</p>
      <p class="mt-0 mb-2.5">If you're curious about my projects, just keep scrolling!</p>
    </div>
    <div class="column">
      <img src="https://avatars.githubusercontent.com/u/46066131?v=4" alt="Profile Picture" class="rounded-full" />
    </div>
  </div>

</span>
</template>

<style scoped>

</style>