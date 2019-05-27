import loadSections from '../../mixins/loadSections'
import { ContentTypes, FetchHookTypes } from '../../types';
import { ModulePrefix } from '../../index'

describe('loadSections', () => {
  const that: any = {
    $store: {
      state: {
        [`${ModulePrefix}_page`]: {
          page: {}
        }
      }
    }
  }

  it('throws error if slug not provided', () => {
    expect(loadSections).toThrowError()
  })

  const slug = 'some-slug'
  const HookCreated = loadSections(slug, FetchHookTypes.Created)

  it('FetchHookTypes.Created, returns null for not existing slug', () => {
    
    const test = HookCreated.computed.wpData.call(that)
    expect(test).toBe(null)
  
  })

  it('FetchHookTypes.Created, returns wpData for existing slug', () => {

    const wpData = {
      title: 'Page title',
      content: 'Hello world',
      date: '2012-02-03'
    }

    that.$store.state[`${ModulePrefix}_page`].page
    [slug] = wpData

    const test = HookCreated.computed.wpData.call(that)

    expect(test).toBe(wpData)

  })

  it('FetchHookTypes.Created, dispatches proper action', () => {

    that.$store.dispatch = () => {}
    const spy = jest.spyOn(that.$store, 'dispatch');

    HookCreated.created.call(that)

    expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_page/load`, {
      slug: slug,
      type: ContentTypes.Page
    })
    spy.mockRestore();

  })
  const HookAsync = loadSections(slug, FetchHookTypes.AsyncData)

  it('FetchHookTypes.AsyncData, dispatches proper action', () => {

    that.$store.dispatch = () => {}
    const spy = jest.spyOn(that.$store, 'dispatch');

    HookAsync.asyncData({ store: that.$store })

    expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_page/load`, {
      slug: slug,
      type: ContentTypes.Page
    })
    spy.mockRestore();

  })

  it('FetchHookTypes.AsyncData, returns proper data', async () => {

    const store = {
      state: {
        [`${ModulePrefix}_page`]: {
          page: {
            [slug]: 'content'
          }
        }
      },
      dispatch: () => {}
    }

    const HookAsync2 = loadSections(slug, FetchHookTypes.AsyncData)
    const { wpData } = await HookAsync2.asyncData({ store })

    expect(wpData).toBe(store.state[`${ModulePrefix}_page`].page[slug])

  })

})