export default defineNuxtConfig({
  extends: 'content-wind',
  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },
})
