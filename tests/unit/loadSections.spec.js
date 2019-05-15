import loadSections from '../../mixins/loadSections'
import { ContentTypes } from '../../types';

describe('loadSections', () => {
  const that = {
    $wp: {
      config: {
        pages: {}
      }
    },
    $store: {
      state: {
        wp_rest_content: {
          pages: {}
        }
      }
    },
    $route: {
      name: 'not-existing-key'
    }
  }

  it('it returns only computed if needed', () => {
    const test = loadSections(false)
      .computed.wpData.call(that)

    expect(test).toBe(null)
  })

  it('it returns null in wpData if page does not exist in store', () => {
    const test = loadSections(false)
      .computed.wpData.call(that)

    expect(test).toBe(null)
  })

  it('it does not panic if store.pages is empty object', () => {
    const test = loadSections(false)
      .computed.wpData.call(that)

    expect(test).toBe(null)
  })

  it('it returns page\'s object in wpData if page exists in store', () => {
    const content = 'Content of page'

    that.$route.name = 'home'
    that.$wp.config.pages[that.$route.name] = 'other-name-in-store-and-api'
    that.$store.state.wp_rest_content.pages[that.$wp.config.pages[that.$route.name]] = content

    const test = loadSections(false)
      .computed.wpData.call(that)

    expect(test).toBe(content)
  })

  it('it returns created function by default', () => {
    const test = loadSections()

    expect(test.created).toBeDefined()
  })

  it('it returns asyncData function if required', () => {
    const test = loadSections(false, true)

    expect(test.asyncData).toBeDefined()
  })

  it('created dispatches loadContent action', () => {
    that.$store.dispatch = () => {}
    const spy = jest.spyOn(that.$store, 'dispatch');
    const test = loadSections.call(that)

    test.created.call(that)

    expect(spy).toHaveBeenCalledWith('wp_rest_content/loadContent', {
      slug: that.$wp.config.pages[that.$route.name],
      lang: 'pl',
      type: ContentTypes.Page
    })
    spy.mockRestore();
  })

  it('asyncData dispatches loadContent action with customConfig provided', () => {
    const customConfig = {
      pages: {
        [that.$route.name]: 'abc'
      }
    }

    const spy = jest.spyOn(that.$store, 'dispatch');
    const test = loadSections.call(that, false, true, customConfig)

    test.asyncData.call(that, {
      store: that.$store,
      route: that.$route
    })

    expect(spy).toHaveBeenCalledWith('wp_rest_content/loadContent', {
      slug: customConfig.pages[that.$route.name],
      lang: 'pl',
      type: ContentTypes.Page
    })
    spy.mockRestore();
  })

})