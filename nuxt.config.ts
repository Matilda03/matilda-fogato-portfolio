export default defineNuxtConfig({
  extends: 'content-wind',

  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },

  compatibilityDate: '2025-01-02',
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
  },
})