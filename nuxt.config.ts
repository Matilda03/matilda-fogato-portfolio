export default defineNuxtConfig({
  extends: 'content-wind',

  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },

  compatibilityDate: '2025-01-02',
})