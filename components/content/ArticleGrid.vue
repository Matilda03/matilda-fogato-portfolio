<script lang="ts">
</script>

<template>
  <div class="article-grid">
    <slot></slot>
  </div>
</template>

<style scoped>
/* Grid layout for articles */
.article-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-bottom: 2rem;
}

@media(max-width: 640px) {
  .article-grid {
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>