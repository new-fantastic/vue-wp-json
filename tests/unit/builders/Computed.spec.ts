import buildComputed from '../../../mixins/wpData/builders/Computed'
import { ModulePrefix } from '../../../'
import FetchHookTypeCreated from '../../../mixins/wpData/fetchHookTypes/Created'
import { LoaderRequestElement, LoaderRequestElementWithValue } from '../../../types'

describe('Computed Builder', () => {

  it('computed returns proper value for loaderRequest: string', () => {

    const slug = 'slug'
    const that3 = {
      $store: {
        state: {
          [`${ModulePrefix}_page`]: {
            page: {
              [slug]: 'secret_value'
            }
          }
        }
      }
    }

    const value: any = FetchHookTypeCreated.call(that3, slug)
    
    expect(value.computed).toBeDefined()
    expect(slug in value.computed).toBeTruthy()
    expect(typeof value.computed.slug).toBe('function')
    expect(value.computed.slug.call(that3)).toBe(
      that3.$store.state[`${ModulePrefix}_page`].page[slug]
    )

  })

  it('computed returns null for loaderRequest: string if it is empty', () => {
    const slug = 'slug'
    const that3 = {
      $store: {
        state: {
          [`${ModulePrefix}_page`]: {
            page: {}
          }
        }
      }
    }

    const value: any = FetchHookTypeCreated.call(that3, slug)
    
    expect(value.computed).toBeDefined()
    expect(slug in value.computed).toBeTruthy()
    expect(typeof value.computed[slug]).toBe('function')
    expect(value.computed.slug.call(that3)).toBeNull()
  })

  it('comptued returns proper value for loaderRequest: LoaderRequestElement', () => {

    const requests: LoaderRequestElementWithValue[] = [
      {
        slug: 'slug1',
        dataName: 'other1',
        post: true,
        value: 'abc'
      },
      {
        slug: 'slug2',
        value: 'abc'
      },
      {
        slug: 'slug3',
        dataName: 'other2',
        value: 'abc'
      },
      {
        slug: 'slug4',
        post: true,
        value: 'abc'
      }
    ]
    const that3 = {
      $store: {
        state: {
          [`${ModulePrefix}_page`]: {
            page: { }
          },
          [`${ModulePrefix}_post`]: {
            post: { }
          }
        }
      }
    }

    for (let request of requests) {

      const dataName = 'dataName' in request
        ? request.dataName
        : request.slug

      const contentType = 'post' in request && request.post
        ? 'post'
        : 'page'

      that3.$store.state[`${ModulePrefix}_${contentType}`]
      [contentType]
      [request.slug] = request.value

      const value: any = FetchHookTypeCreated.call(that3, request)
  
      expect(value.computed).toBeDefined()
      expect(dataName in value.computed).toBeTruthy()
      expect(typeof value.computed[dataName]).toBe('function')

      expect(value.computed[dataName].call(that3)).toBe(
        that3.$store.state[`${ModulePrefix}_${contentType}`]
        [contentType]
        [request.slug]
      )

    }

  })

  it('computed returns proper value for loaderRequest: Array<LoaderRequestElement | string>', () => {

    const requestsToSend: Array<LoaderRequestElement | string> = [
      {
        slug: 'slug1',
        dataName: 'other1',
        post: true
      },
      {
        slug: 'slug2'
      },
      {
        slug: 'slug3',
        dataName: 'other2'
      },
      {
        slug: 'slug4',
        post: true
      },
      'hello'
    ]

    const requestsLocal: Array<LoaderRequestElementWithValue | string> = [
      {
        slug: 'slug1',
        dataName: 'other1',
        post: true,
        value: 'abc'
      },
      {
        slug: 'slug2',
        value: 'abc'
      },
      {
        slug: 'slug3',
        dataName: 'other2',
        value: 'abc'
      },
      {
        slug: 'slug4',
        post: true,
        value: 'abc'
      },
      'hello'
    ]

    const stringsValue: string = 'abc'

    const that3 = {
      $store: {
        state: {
          [`${ModulePrefix}_page`]: {
            page: { }
          },
          [`${ModulePrefix}_post`]: {
            post: { }
          }
        }
      }
    }

    for (let request of requestsLocal) {

      if(typeof request === 'string') {

        that3.$store.state[`${ModulePrefix}_page`].page
        [request] = stringsValue

      } else {

        const contentType = 'post' in request && request.post
          ? 'post'
          : 'page'

        that3.$store.state[`${ModulePrefix}_${contentType}`]
        [contentType]
        [request.slug] = request.value

      }

    }

    const value: any = FetchHookTypeCreated.call(that3, requestsToSend)

    expect(value.computed).toBeDefined()
    expect(Object.keys(value.computed).length).toBe(requestsToSend.length)

    for(let request of requestsLocal) {

      if (typeof request === 'string') {

        expect(request in value.computed).toBeTruthy()
        expect(typeof value.computed[request]).toBe('function')

        expect(value.computed[request].call(that3)).toBe(
          that3.$store.state[`${ModulePrefix}_page`].page
          [request]
        )

      } else {

        const dataName = 'dataName' in request
          ? request.dataName
          : request.slug

        const contentType = 'post' in request && request.post
          ? 'post'
          : 'page'

        expect(dataName in value.computed).toBeTruthy()
        expect(typeof value.computed[dataName]).toBe('function')

        expect(value.computed[dataName].call(that3)).toBe(
          that3.$store.state[`${ModulePrefix}_${contentType}`]
          [contentType]
          [request.slug]
        )

      }

    }

  })

})