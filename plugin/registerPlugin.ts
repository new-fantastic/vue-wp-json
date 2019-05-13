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
}