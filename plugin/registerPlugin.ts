export default (Vue, plugin) => {
  if('validator' in plugin) {
    if(!Vue.prototype.$wp.validators) {
      Vue.prototype.$wp.validators = []
    }

    Vue.prototype.$wp.validators.push(plugin.validator)
  }
}