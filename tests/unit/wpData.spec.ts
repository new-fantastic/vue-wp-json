import wpData from '../../mixins/wpData'
import { FetchHookTypes, LoaderRequestElement } from '../../types'
// import { ModulePrefix } from '../../index'
// import Meta from '../../plugin/inheritable/Meta'

describe('Mixin: wpData', () => {

  it('picks FetchHookType.Created', () =>{

    const value: any = wpData.call({
      $route: {}
    }, "mock", FetchHookTypes.Created)

    expect(value).toBeDefined()
    expect(typeof value.created).toEqual('function') 

  })

  it('picks FetchHookType.AsyncData', () =>{

    const value: any = wpData("mock", FetchHookTypes.AsyncData)

    expect(value).toBeDefined()
    expect(typeof value.asyncData).toEqual('function') 

  })

  it('picks FetchHookType.VoidAsyncData', () =>{

    const value: any = wpData("mock", FetchHookTypes.AsyncData)

    expect(value).toBeDefined()
    expect(typeof value.asyncData).toEqual('function') 

  })

  it('throws error when picking not existing one', () => {

    expect(() => {
      const value: any = wpData("mock", 67676767)
    }).toThrow()

  })

})