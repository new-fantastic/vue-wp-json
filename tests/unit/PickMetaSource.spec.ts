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

})