<template>
  <section id="about-me" class="py-16 px-4 md:px-8">
    <div class="max-w-5xl mx-auto rounded-[2.5rem] p-8 md:p-10
      bg-white/50 dark:bg-white/5
      backdrop-blur-xl
      border border-white/70 dark:border-white/10
      shadow-2xl shadow-neutral-900/10 dark:shadow-black/40"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
        <!-- Left Column: Text Content -->
        <div class="space-y-5 lg:col-span-2">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
            About Me
          </h2>
          <p class="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
            I'm a passionate computer science student with experience in front-end development, AI, and Digital Twins. I love creating intuitive designs and solving challenging problems.
          </p>
          <p class="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
            For the past two years, I've been part of the EAISI Digital Twins Lab at Eindhoven University of Technology, developing a software stack for digital twins. My work focuses on creating simulations and visualizations that connect physical assets to their virtual counterparts, turning complex data into practical insights.
          </p>
          <p class="text-neutral-600 dark:text-neutral-300 text-lg leading-relaxed">
            When I'm not coding, I'm probably exploring new tech, reading a psychology book, or playing guitar somewhere in Spain.
          </p>
        </div>

        <!-- Right Column: Image -->
        <div class="lg:col-span-1 flex justify-center">
          <div class="relative w-full max-w-xs">
            <div class="absolute inset-0 rounded-3xl bg-primary-400/20 dark:bg-primary-500/10 blur-2xl scale-95" />
            <img
              src="/hero-picture.jpg"
              alt="Profile photo"
              class="relative rounded-3xl shadow-xl object-cover w-full aspect-[3/4]
                border border-white/60 dark:border-white/10"
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>
