import { ContentTypes, isLoaderRequestElement, FetchHookTypes, LoaderRequestElement } from '../../../types'
import pickMetaSource from '../../mixins/PickMetaSource'

describe('PickMetaSource', () => {

  it('picks proper meta from loaderRequest: string', () => {
    
    const slug = 'abc'
    const value = pickMetaSource(slug)

    expect(value).toBe(slug)

  })

  it('picks proper meta from loaderRequest: LoaderRequestElement', () => {
    
    const request: LoaderRequestElement = {
      slug: 'abc',
      dataName: 'diffrent',
      meta: true
    }
    const value = pickMetaSource(request)

    expect(value).toBe(request.dataName)

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

    expect(value).toBe((<LoaderRequestElement>requests[0]).dataName)

  })

})