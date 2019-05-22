import Vue from 'vue'
import { VueConstructor } from 'vue/types'
import { ContentTypes, FetchHookTypes } from '../types'
import { ModulePrefix } from '../index'
import { pagePrefix, postPrefix } from '../router/routes'

export default (): VueConstructor<Record<never, any> & Vue> => {

    let downloadedData = false

    const mixin: any = {
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
      }
    }

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

      mixin.asyncData = async ({ store, route, redirect }) => {

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

      mixin.created = async () => {

        // What did I mean with these conditions?
        // I wanted to make sure that data is downloaded only once
        // In asyncData for Nuxt
        // In created for Vue

        const nuxtClientCondition = process 
          && 'server' in process 
          && process.server

        if(!nuxtClientCondition && !downloadedData && this && this.wpData === null) {
          this.wpData = await fetchData(this.$store, this.$route)
          if(!this.wpData) {
            this.$router.push('/')
          }
        }
        
      }
  
    return Vue.extend(mixin)
  }