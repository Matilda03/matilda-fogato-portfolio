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
  <div class="article-card">
    <NuxtLink :to="href" :external="external">
      <img :src="image" class="object-cover my-0"/>
      <h3 class="text-center mt-2">{{ title }}</h3>
      <ContentSlot :use="$slots.default" unwrap="p" />
    </NuxtLink>
  </div>

</template>

<style scoped>
.article-card {
  max-width: 250px;
  margin-right: 6px;
  margin-left: 6px;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}
.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 9px rgba(0, 0, 0, 0.2);
}

.article-card img {
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.article-card h3 {
  font-size: 1rem;
  font-weight: 500;
  margin: 16px 0;

}

@media(max-width: 640px) {
  .article-card {
    width: 90vw;
    max-width: 90vw;
    margin-right: 0;
    margin-left: 0;
    margin-top: 6px;
    margin-bottom: 6px;
  }
}
</style>