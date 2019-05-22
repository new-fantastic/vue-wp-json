import Vue from 'vue'
import { VueConstructor } from 'vue/types'
import { ContentTypes, FetchHookTypes } from '../types'
import { ModulePrefix } from '../index'
import { pagePrefix, postPrefix } from '../router/routes' 

export default (
  createdOrAsync: FetchHookTypes = FetchHookTypes.Created)
  : VueConstructor<Record<never, any> & Vue> => {

    const mixin: any = {}

    const fetchData = async (store, route) => {
      const short = route.name === pagePrefix 
      ? 'page'
      : 'post'

      const prefix = `${ModulePrefix}_${short}`

      await store.dispatch(`${prefix}/load`, {
        slug: route.params.slug,
        type: short === 'page' 
          ? ContentTypes.Post 
          : ContentTypes.Page
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

    if (createdOrAsync === FetchHookTypes.AsyncData) {
      mixin.asyncData = async ({ store, route, redirect }) => {
        
        const wpData = await fetchData(store, route)
        if(!wpData) {
          redirect('/')
        }
  
        return {
          wpData
        }
      }
    }

    if (createdOrAsync === FetchHookTypes.Created) {
      mixin.created = async () => {

        this.wpData = await fetchData(this.$store, this.$route)
        if(!this.wpData) {
          this.$router.push('/')
        }
        
      }
    }
  
    return Vue.extend(mixin)
  }