import Vue from 'vue'
import { VueConstructor } from 'vue/types'
import { ContentTypes, FetchHookTypes } from '../types'
import { ModulePrefix } from '../index'
import { pagePrefix, postPrefix } from '../router/routes'

const fetchData = async (store, route) => {
  const short = route.name === pagePrefix 
  ? 'page'
  : 'post'

  const prefix = `${ModulePrefix}_${short}`

  await store.dispatch(`${prefix}/load`, {
    slug: route.params.slug,
    type: short === 'page' 
      ? ContentTypes.Page 
      : ContentTypes.Post
  });

  return (() => {
    const result = store.state
    [prefix]
    [short]
    [route.params.slug]

    return result || result === false
      ? result
      : null
  })()
}

let downloadedData = false

export default {
  
      watch: {
        async $route(to) {
          const short = to.name === pagePrefix 
            ? `${ModulePrefix}_page`
            : `${ModulePrefix}_post`
    
          await this.$store.dispatch(`${short}/load`, {
            slug: to.params.slug,
            type: short === `${ModulePrefix}_page` 
            ? ContentTypes.Page 
            : ContentTypes.Post
          });

        },

        loadedWpData (n) {
          this.wpData = n
        }
      },

      computed: {
        loadedWpData () {
          const short = this.$route.name === pagePrefix 
            ? 'page'
            : 'post'

          return this.$store.state[`${ModulePrefix}_${short}`][short][this.$route.params.slug]
            ? this.$store.state[`${ModulePrefix}_${short}`][short][this.$route.params.slug]
            : null
        }
      },

      async created () {

        // What did I mean with these conditions?
        // I wanted to make sure that data is downloaded only once
        // In asyncData for Nuxt
        // In created for Vue

        const nuxtClientCondition = process 
          && 'server' in process 
          && process.server


        if(!nuxtClientCondition && !downloadedData && this && (this.wpData === null || this.wpData === undefined)) {
          this.wpData = await fetchData(this.$store, this.$route)
          if(!this.wpData) {
            this.$router.push('/')
          }
        }
        
      },

      async asyncData ({ store, route, redirect }) {

        const wpData = await fetchData(store, route)
        if(!wpData) {
          redirect('/')
        } else {
          downloadedData = true
        }
  
        return {
          wpData
        }
      }
}