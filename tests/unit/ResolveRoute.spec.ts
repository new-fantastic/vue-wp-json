import ResolveRoute from '../../util/ResolveRoute'

describe('ResolveRoute', () => {

  it('returns normal slug if $route did not appear', () => {

    expect(ResolveRoute('abc', {})).toBe('abc')

  })

  it('returns $route', () => {

    const $route = 'test-value'
    const str = '$route'

    expect(ResolveRoute(str, $route)).toBe($route)

  })

  it('returns $route.oneDeep', () => {

    const $route = {
      oneDeep: 'abc'
    }
    const str = '$route.oneDeep'

    expect(ResolveRoute(str, $route)).toBe($route.oneDeep)

  })

  it('returns $route.a.b.c', () => {

    const $route = {
      a: {
        b: {
          c: 'value'
        }
      }
    }
    const str = '$route.a.b.c'

    expect(ResolveRoute(str, $route)).toBe($route.a.b.c)

  })

})