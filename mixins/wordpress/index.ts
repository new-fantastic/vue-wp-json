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
      return await option.call(this)
    case 'object':
      if (Array.isArray(option)) {
        return option
      } else {
        return [option]
      }
    default:
      console.log(`[VueWordpress] 'wordpress' option cannot be type of ${option}`)
      break;
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
      const options = await resolveOption(this.$options.wordpress)
      await Promise.all(options.map(option => prepareAction.call(this, option)))
    } catch (err) {
      console.log('[VueWordpress] Something went wrong inside beforeMount with', this.$options.wordpress)
    }
  },
  async serverPrefetch () {
    if (!this.$options || !this.$options.wordpress) {
      return
    }
    try {
      const options = await resolveOption(this.$options.wordpress)
      await Promise.all(options.map(option => prepareAction.call(this, option)))
    } catch (err) {
      console.log('[VueWordpress] Something went wrong inside serverPrefetch with', this.$options.wordpress)
    }
  }
}