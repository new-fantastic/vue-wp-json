import { ModulePrefix } from './../../index';
interface WordpressOption {
  slug: String,
  type?: Boolean
}

/**
 * 
 * @param option {Function, Array<WordpressOption>, WordpressOption} - option
 * @describe It normalize option to array of options
 */
const resolveOption = function (option: Function | Array<WordpressOption> | WordpressOption) {
  switch (typeof option) {
    case 'function':
      return option()
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

const prepareAction = function (option: WordpressOption): Promise<any> {
  return this.$store.dispatch(`${ModulePrefix}_post/load`, option)
}

export default {
  async beforeMount () {
    if (!this.$options?.wordpress) {
      return
    }
    const options = resolveOption(this.$options.wordpress)
    await Promise.all(options.map(option => prepareAction.call(this, option)))
    console.log('Fetched stuff')
  }
}