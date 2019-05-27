import registerPlugin from '../../plugin/registerPlugin'
import { createLocalVue } from '@vue/test-utils'

import { SET_LAYOUT } from '../../store/layouts/mutation-types'
import { ModulePrefix } from '../../index'

describe('registerPlugin', () => {

  const localVue = createLocalVue()

  it('removes "vue-wp-json-" prefix', async () => {
    const name = 'vue-wp-json-test'
    const nameAfterFilter = 'test'

    expect(registerPlugin(localVue, name))
    .rejects
    .toEqual(new Error(`Extension "${nameAfterFilter}" does not exist`))
  
  })

  it('imports proper extension', async () => {
    const name = 'not-existing extension'
    expect(registerPlugin(localVue, name))
    .rejects
    .toEqual(new Error(`Extension "${name}" does not exist`))
  
  })

  it('registers custom blocks', () => {
    const customCmpName = 'custom-block'
    registerPlugin(localVue, {
      blocks: {
        [customCmpName]: {}
      }
    })
    expect(localVue.sealedOptions.components[customCmpName]).toBeDefined()
  })

  it('creates layouts inside $wp', () => {
    registerPlugin(localVue, {
      layouts: {}
    })
    expect(localVue.prototype.$wp.layouts).toBeDefined()
  })

  // Custom section

  it('registers custom Section', () => {
    registerPlugin(localVue, {
      layouts: {
        Section: {
          'a': '1'
        }
      }
    })
    expect(localVue.prototype.$wp.layouts.section).toBeDefined()
    expect(localVue.prototype.$wp.layouts.section).toBe(true)
    expect(localVue.sealedOptions.components['AlternativeSection']).toBeDefined()
  })

  it('override custom Section if there are more than one', () => {
    const newValue = 1231232;

    registerPlugin(localVue, {
      layouts: {
        Section: {
          'a': newValue
        }
      }
    })

    expect(localVue.sealedOptions.components['AlternativeSection']
    .extendOptions.a).toBe(newValue)
  })

  // Custom column

  it('registers custom Column', () => {
    registerPlugin(localVue, {
      layouts: {
        Column: {
          'a': '1'
        }
      }
    })
    expect(localVue.prototype.$wp.layouts.column).toBeDefined()
    expect(localVue.prototype.$wp.layouts.column).toBe(true)
    expect(localVue.sealedOptions.components['AlternativeColumn']).toBeDefined()
  })

  it('override custom Column if there are more than one', () => {
    const newValue = 1231232;

    registerPlugin(localVue, {
      layouts: {
        Column: {
          'a': newValue
        }
      }
    })

    expect(localVue.sealedOptions.components['AlternativeColumn']
    .extendOptions.a).toBe(newValue)
  })

  // Custom page

  it('registers custom Page for Vue App', () => {

    const extension = {
      layouts: {
        Page: {
          'a': '1'
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store)

    expect(localVue.prototype.$wp.layouts.page).toBeDefined()
    expect(localVue.prototype.$wp.layouts.page).toBe(extension.layouts.Page)
    expect(localVue.sealedOptions.components['AlternativePage']).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'page',
        value: extension.layouts.Page
      }
    )
    spy.mockRestore()
  })

  it('registers custom Page for Nuxt App', () => {

    const cmpName = 'AlternativePage'

    const extension = {
      layouts: {
        Page: {
          'a': '1'
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store, 'nuxt')

    expect(localVue.prototype.$wp.layouts.page).toBeDefined()
    expect(localVue.prototype.$wp.layouts.page).toBe(cmpName)
    expect(localVue.sealedOptions.components[cmpName]).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'page',
        value: cmpName
      }
    )
    spy.mockRestore()
  })

  it('override custom Page if there are more than one in Vue App', () => {

    const newValue = 123

    const extension = {
      layouts: {
        Page: {
          'a': newValue
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store)

    expect(localVue.prototype.$wp.layouts.page).toBeDefined()
    expect(localVue.prototype.$wp.layouts.page).toBe(extension.layouts.Page)
    expect(localVue.sealedOptions.components['AlternativePage']).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'page',
        value: extension.layouts.Page
      }
    )
    spy.mockRestore()

    expect(localVue.sealedOptions.components['AlternativePage']
    .extendOptions.a).toBe(newValue)
  })

  it('override custom Page if there are more than one in Nuxt App', () => {

    const cmpName = 'AlternativePage'

    //////////////////

    const newValue = 123

    const extension = {
      layouts: {
        Page: {
          'a': newValue
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store, 'nuxt')

    expect(localVue.prototype.$wp.layouts.page).toBeDefined()
    expect(localVue.prototype.$wp.layouts.page).toBe(cmpName)
    expect(localVue.sealedOptions.components[cmpName]).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'page',
        value: cmpName
      }
    )
    spy.mockRestore()

    expect(localVue.sealedOptions.components[cmpName]
    .extendOptions.a).toBe(newValue)
  })

  // Custom post

  it('registers custom Post for Vue App', () => {

    const extension = {
      layouts: {
        Post: {
          'a': '1'
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store)

    expect(localVue.prototype.$wp.layouts.post).toBeDefined()
    expect(localVue.prototype.$wp.layouts.post).toBe(extension.layouts.Post)
    expect(localVue.sealedOptions.components['AlternativePost']).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'post',
        value: extension.layouts.Post
      }
    )
    spy.mockRestore()
  })

  it('registers custom Post for Nuxt App', () => {

    const cmpName = 'AlternativePost'

    const extension = {
      layouts: {
        Post: {
          'a': '1'
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store, 'nuxt')

    expect(localVue.prototype.$wp.layouts.post).toBeDefined()
    expect(localVue.prototype.$wp.layouts.post).toBe(cmpName)
    expect(localVue.sealedOptions.components[cmpName]).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'post',
        value: cmpName
      }
    )
    spy.mockRestore()
  })

  it('override custom Post if there are more than one in Vue App', () => {

    const newValue = 123

    const extension = {
      layouts: {
        Post: {
          'a': newValue
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store)

    expect(localVue.prototype.$wp.layouts.post).toBeDefined()
    expect(localVue.prototype.$wp.layouts.post).toBe(extension.layouts.Post)
    expect(localVue.sealedOptions.components['AlternativePost']).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'post',
        value: extension.layouts.Post
      }
    )
    spy.mockRestore()

    expect(localVue.sealedOptions.components['AlternativePost']
    .extendOptions.a).toBe(newValue)
  })

  it('override custom Post if there are more than one in Nuxt App', () => {

    const cmpName = 'AlternativePost'

    //////////////////

    const newValue = 123

    const extension = {
      layouts: {
        Post: {
          'a': newValue
        }
      }
    }

    const store = {
      commit: () => {}
    }

    const spy = jest.spyOn(store, 'commit')

    registerPlugin(localVue, extension, store, 'nuxt')

    expect(localVue.prototype.$wp.layouts.post).toBeDefined()
    expect(localVue.prototype.$wp.layouts.post).toBe(cmpName)
    expect(localVue.sealedOptions.components[cmpName]).toBeDefined()
  
    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_layouts/${SET_LAYOUT}`, 
      {
        key: 'post',
        value: cmpName
      }
    )
    spy.mockRestore()

    expect(localVue.sealedOptions.components[cmpName]
    .extendOptions.a).toBe(newValue)
  })

  it('registers API\'s middleware', () => {

    const key = 'page'

    const extension = {
      middleware: {
        api: {
          [key]: () => { console.log('test func') }
        }
      }
    }

    registerPlugin(localVue, extension)

    expect(localVue.prototype.$wp.api).toBeDefined()
    expect(localVue.prototype.$wp.api[key]).toBeDefined()
    expect(localVue.prototype.$wp.api[key]).toBeInstanceOf(Array)
    expect(localVue.prototype.$wp.api[key]).toContain(extension.middleware.api[key])

  })

  it('registers Root\'s validator', () => {

    const extension = {
      middleware: {
        root: {
          validator (value) {
            return true
          }
        }
      }
    }

    registerPlugin(localVue, extension)

    expect(localVue.prototype.$wp.validators).toBeDefined()
    expect(localVue.prototype.$wp.validators.root).toBeDefined()
    expect(localVue.prototype.$wp.validators.root).toBeInstanceOf(Array)
    expect(localVue.prototype.$wp.validators.root).toContain(extension.middleware.root.validator)
    expect(typeof localVue.prototype.$wp.validators.root[0]()).toBe('boolean')

  })

  it('registers Root\'s interpreter', () => {

    const extension = {
      middleware: {
        root: {
          interpret (data, chosenSection, h) {
            return []
          }
        }
      }
    }

    registerPlugin(localVue, extension)

    expect(localVue.prototype.$wp.interpret).toBeDefined()
    expect(localVue.prototype.$wp.interpret.root).toBeDefined()
    expect(localVue.prototype.$wp.interpret.root).toBeInstanceOf(Array)
    expect(localVue.prototype.$wp.interpret.root).toContain(extension.middleware.root.interpret)
    
  })

  it('registers Section\'s interpreter', () => {

    const extension = {
      middleware: {
        section: {
          interpret (data, chosenSection, h) {
            return []
          }
        }
      }
    }

    registerPlugin(localVue, extension)

    expect(localVue.prototype.$wp.interpret).toBeDefined()
    expect(localVue.prototype.$wp.interpret.section).toBeDefined()
    expect(localVue.prototype.$wp.interpret.section).toBeInstanceOf(Array)
    expect(localVue.prototype.$wp.interpret.section).toContain(extension.middleware.section.interpret)
    
  })

})