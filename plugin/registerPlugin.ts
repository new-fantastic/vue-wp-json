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

    if('Column' in plugin.layouts) {
      Vue.prototype.$wp.layouts.column = true
      Vue.component('AlternativeColumn', plugin.layouts.Column)
    }

    if('Page' in plugin.layouts) {
      Vue.prototype.$wp.layouts.page = plugin.layouts.Page
    }

    if('Post' in plugin.layouts) {
      Vue.prototype.$wp.layouts.post = plugin.layouts.Post
    }
  }

  if('filters' in plugin) {
    Vue.prototype.$wp.filters = {}
    if('api' in plugin.filters) {
      Vue.prototype.$wp.filters.api = {}
      for(const [key, value] of Object.entries(plugin.filters.api)) {
        if(!Vue.prototype.$wp.filters.api[key]) {
          Vue.prototype.$wp.filters.api[key] = []
        }
        Vue.prototype.$wp.filters.api[key].push(value)
      }
    }
  }

  if('renderRoot' in plugin) {
    if(!Vue.prototype.$wp.renderRoot) {
      Vue.prototype.$wp.renderRoot = []
    }
    Vue.prototype.$wp.renderRoot.push(plugin.renderRoot)
  }

  if('sectionData' in plugin) {
    if(!Vue.prototype.$wp.sectionData) {
      Vue.prototype.$wp.sectionData = []
    }
    Vue.prototype.$wp.sectionData.push(plugin.sectionData)
  }
}