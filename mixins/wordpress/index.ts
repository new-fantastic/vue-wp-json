import { WordpressOption } from './../../types/index';
import { ModulePrefix } from './../../index';

/**
 * 
 * @param option {Function, Array<WordpressOption>, WordpressOption} - option
 * @describe It normalize option to array of options
 */
const resolveOption = async function (option: Function | Array<WordpressOption> | WordpressOption) {
  switch (typeof option) {
    case 'function':
      const response = await option.call(this)
      return await resolveOption(response)
    case 'object':
      if (Array.isArray(option)) {
        return option
      } else {
        return [option]
      }
    default:
      // console.log(`[VueWordpress] 'wordpress' option cannot be type of ${option}`)
      return false
  }
}

/**
 * 
 * @param option {WordpressOption} - Configuration for request
 * @returns {Promise} for request
 */
const prepareAction = function (option: WordpressOption): Promise<any> {
  return this.$store.dispatch(`${ModulePrefix}_post/load`, option)
}

export default {
  async beforeMount () {
    if (!this.$options || !this.$options.wordpress) {
      return
    }
    try {
      const options = await resolveOption.call(this, this.$options.wordpress)
      if (!options) {
        return
      }
      await Promise.all(options.map(async option => {
        if (!option) {
          return Promise.resolve()
        }
        const slug = typeof option.slug === 'function' ? await option.slug.call(this) : option.slug
        return prepareAction.call(this, {
          ...option,
          slug
        })
      }))
    } catch (err) {
      console.log('[VueWordpress] Something went wrong inside beforeMount with', this.$options.wordpress)
      console.log('[VueWordpress]', err)
    }
  },
  async serverPrefetch () {
    if (!this.$options || !this.$options.wordpress) {
      return
    }
    try {
      const options = await resolveOption.call(this, this.$options.wordpress)
      if (!options) {
        return
      }
      await Promise.all(options.map(async option => {
        if (!option) {
          return Promise.resolve()
        }
        const slug = typeof option.slug === 'function' ? await option.slug.call(this) : option.slug
        return prepareAction.call(this, {
          ...option,
          slug
        })
      }))
    } catch (err) {
      console.log('[VueWordpress] Something went wrong inside serverPrefetch with', this.$options.wordpress)
      console.log('[VueWordpress]', err)
    }
  }
}