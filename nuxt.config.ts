export default defineNuxtConfig({
  extends: 'content-wind',

  nitro: {
    storage: {
      data: { driver: 'vercelKV' },
    },
  },

  router: {
    options: {
      scrollBehaviorType: "smooth",
    }
  },

  compatibilityDate: '2025-01-02',
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap' },
        {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Mono:wght@100..900&display=swap'}]
    },
  },
})