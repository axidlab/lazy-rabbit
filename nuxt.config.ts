// import { defineNuxtConfig } from "nuxt"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Lazy Rabbit"
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ["v-network-graph/lib/style.css"],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  content: {
    contentHead: false
  }
})
