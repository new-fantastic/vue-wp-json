export default (Vue, plugin) => {
  if('validator' in plugin) {
    if(!Vue.prototype.$wp.validators) {
      Vue.prototype.$wp.validators = []
    }

    Vue.prototype.$wp.validators.push(plugin.validator)
  }

  if('blocks' in plugin) {
    for(const [key, value] of Object.entries(plugin.blocks)) {
      Vue.component(key, value)
    }
  }

  if('layouts' in plugin) {
    Vue.prototype.$wp.layouts = {}
    if('Section' in plugin.layouts) {
      Vue.prototype.$wp.layouts.section = true
      Vue.component('AlternativeSection', plugin.layouts.Section)
    }
  }
}