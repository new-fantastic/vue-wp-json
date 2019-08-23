import { ContentTypes, isLoaderRequestElement, FetchHookTypes, LoaderRequestElement } from '../../../types'
import pickMetaSource from '../../mixins/PickMetaSource'

describe('PickMetaSource', () => {

  it('picks proper meta from loaderRequest: string', () => {
    
    const slug = 'abc'
    const value = pickMetaSource(slug)

    expect(value).toEqual({slug, type: 'pages'})

  })

  it('picks proper meta from loaderRequest: LoaderRequestElement', () => {
    
    const request: LoaderRequestElement = {
      slug: 'abc',
      dataName: 'diffrent',
      meta: true
    }
    const value = pickMetaSource(request)

    expect(value).toEqual({slug: request.dataName, type: 'pages'})

  })

  it('picks proper meta from loaderRequest: LoaderRequestElement with custom post type', () => {
    
    const type = 'zanzibar'

    const request: LoaderRequestElement = {
      slug: 'abc',
      dataName: 'diffrent',
      meta: true,
      type
    }
    const value = pickMetaSource(request)

    expect(value).toEqual({slug: request.dataName, type})

  })

  it('picks proper meta from loaderRequest: Array<LoaderRequestElement | string>', () => {
    
    const requests: Array<LoaderRequestElement | string> = [
      {
        slug: 'abc',
        dataName: 'other',
        meta: true
      },
      'diffrent'
    ]
    const value = pickMetaSource(requests)

    expect(value).toEqual({slug: (<LoaderRequestElement>requests[0]).dataName, type: 'pages'})

  })

  it('picks proper meta from loaderRequest: Array<LoaderRequestElement | string> with custom post type', () => {
    
    const type = 'zanzibar2'

    const requests: Array<LoaderRequestElement | string> = [
      {
        slug: 'abc',
        dataName: 'other',
        meta: true
      },
      {
        slug: 'xde',
        dataName: 'lol',
        meta: true,
        type
      },
      'diffrent'
    ]
    const value = pickMetaSource(requests)

    expect(value).toEqual({slug: (<LoaderRequestElement>requests[1]).dataName, type })

  })

})