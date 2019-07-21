import FetchHookTypeCreated from '../../mixins/wpData/fetchHookTypes/Created'
import { ModulePrefix } from '../../'
import { ContentTypes, LoaderRequestElement } from '../../types';

describe('FetchHookType: Created', () => {

  const that = {
    $store: {
      dispatch (state, payload) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 100)
        })
      }
    }
  }

  it('builds proper Created for loaderRequest: string', () => {

    const slug = 'slug'

    const value: any = FetchHookTypeCreated.call(that, slug)
    const spy = jest.spyOn(that.$store, 'dispatch')
    const invoke = value.created.call(that)

    expect(spy).toHaveBeenCalledWith(
      `${ModulePrefix}_page/load`,
      {
        slug: slug,
        type: ContentTypes.Page
      }
    )

  })

  it('builds proper Created for loaderRequest: LoaderRequest', () => {

    const tests: LoaderRequestElement[] = [
      {
        slug: 'slug',
        post: true
      },
      {
        slug: 'slug2',
        post: false
      },
      {
        slug: 'slug3'
      }
    ]

    for (let test of tests) {

      const value: any = FetchHookTypeCreated.call(that, test)
      const spy = jest.spyOn(that.$store, 'dispatch')
      const invoke = value.created.call(that)

      expect(spy).toHaveBeenCalledWith(
        'post' in test && test.post 
          ? `${ModulePrefix}_post/load`
          : `${ModulePrefix}_page/load`,
        {
          slug: test.slug,
          type: 'post' in test && test.post 
            ? ContentTypes.Post 
            : ContentTypes.Page
        }
      )

    }

  })

  it('builds proper Created for loaderRequest: Array<LoaderRequest | string>', async () => {

    const test = [
      {
        slug: 'slug',
        post: true
      },
      {
        slug: 'slug2',
        post: false
      },
      'slug3'
    ]

    const value: any = FetchHookTypeCreated.call(that, test)
    const spy = jest.spyOn(that.$store, 'dispatch')
    const invoke = await value.created.call(that)

    for (let i = 0, len = test.length; i < len; i++) {

      expect(spy).toHaveBeenNthCalledWith(i+1,
        typeof test[i] !== 'string' && 'post' in test[i] && test[i].post 
          ? `${ModulePrefix}_post/load`
          : `${ModulePrefix}_page/load`,
        {
          slug: typeof test[i] === 'string' ? test[i] : test[i].slug,
          type: typeof test[i] !== 'string' && 'post' in test[i] && test[i].post
            ? ContentTypes.Post 
            : ContentTypes.Page
        }
      )

    }

  })

  it('throws error when buildCreated gets a bad argument', async () => {

    const value: any = FetchHookTypeCreated.call(that, [155,12]) // Bad arg

    let error
    try {
      await value.created.call(that)
    } catch(e) {
      error = e
    }

    expect(error).toEqual(new Error('FetchHookType Created: Bad loaderRequest'))

  })

})