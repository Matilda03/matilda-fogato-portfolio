<script lang="ts">
</script>

<template>
<span class="prose dark:prose-invert" id="about">
  <!-- Image Card: two columns side by side for wide screens, stack for narrow screens -->
  <div class="columns-2">
    <div class="column text-sm">
      <p class="mt-0 mb-2.5">I'm a passionate computer science student with experience in front-end development, AI, and Digital Twins. I love creating intuitive designs and solving challenging problems.</p>
      <p class="mt-0 mb-2.5">For the past two years, I've been part of the EAISI Digital Twins Lab at Eindhoven University of Technology, developing a software stack for digital twins. My work focuses on creating simulations and visualizations that connect physical assets to their virtual counterparts, turning complex data into practical insights.</p>
      <p class="mt-0 mb-2.5">My mission is to design simple, user-friendly experiences that demystify the world of big data. To me, developing more explainable models is the only way forward.</p>
        <p class="mt-0 mb-2.5">When I’m not coding, I’m probably exploring new tech, reading a psychology book, or playing guitar somewhere in Spain.</p>
      <p class="mt-0 mb-2.5">If you're curious about my work, feel free to <a href="projects">check it out</a>!</p>
    </div>
    <div class="column">
      <img src="https://avatars.githubusercontent.com/u/46066131?v=4" alt="Profile Picture" class="rounded-full" />
    </div>
  </div>

</span>
</template>

<style scoped>
.columns-2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10%;
}

.column.text-sm {
  flex: 0 0 50%;
}

.column img{
  flex: 0 0 40%;
}

@media (max-width: 640px) {
  .columns-2 {
    flex-direction: column-reverse;
    align-items: center;
  }
  img {
    max-width: 100%;
    max-height: 200px;
    object-fit: cover;
  }
}
</style>