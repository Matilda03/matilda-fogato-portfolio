<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ImageCard.vue"
})
</script>

<template>
<span class="not-prose">
  <div class="columns-2">
    <div class="column">
      <h2 class="text-2xl font-medium text-left mb-2">Hi there, I'm Mati 🤖</h2>
      <p class="text-sm text-left">I'm a passionate computer science student with experience in front-end development, AI, and Digital Twins. I love creating intuitive designs and solving challenging problems.</p>
      <p class="text-sm text-left">My mission is to design simple, user-friendly experiences that demystify the world of big data. To me, developing more explainable models is the only way forward.</p>
      <p class="text-sm text-left">When I’m not coding, I’m probably exploring new tech, reading a psychology book, or playing guitar somewhere in Spain.</p>
      <p class="text-sm text-left">If you're curious about my projects, just keep scrolling!</p>
    </div>
    <div class="column">
      <img src="https://avatars.githubusercontent.com/u/46066131?v=4" alt="Profile Picture" class="rounded-full" />
    </div>
  </div>

</span>
</template>

<style scoped>

</style>