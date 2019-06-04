import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { ModulePrefix } from '../../index'
import BaseMenu from '../../components/Base/BaseMenu'

const Factory = (slug: string, items: Array<any>) => {
  return shallowMount(BaseMenu, {
    stubs: {
      RouterLink: RouterLinkStub
    },
    propsData: {
      slug
    },
    mocks: {
      $store: {
        state: {
          [`${ModulePrefix}_menu`]: {
            menu: {
              [slug]: {
                items
              }
            }
          }
        }
      }
    }
  })
}

const GetDeepLevel = (level: Number): string => {
  'ul > li > ul > li > a'
  if(level < 1) {
    throw new Error('Too small level')
  }
  let base = 'ul > li >'

  for(let i = 2; i <= level; i++) {
    base += ' ul > li >'
  }

  base += ' a'
  return base
}

describe('BaseMenu', () => {
  const slug = 'my-test-slug'

  it('it generates base menu and distinguish internal/external links', () => {
    
    const items = [
      {
        ID: 1,
        url: 'test-a',
        title: 'Test A'
      },
      {
        ID: 25,
        url: 'http://google.com',
        title: 'Test B'
      }
    ]

    const vm = Factory(slug, items)

    expect(vm.element.tagName).toBe('UL')

    expect(vm.find('a').exists()).toBe(true)
    expect(vm.find(RouterLinkStub).exists()).toBe(true)
  })

  it('it generates one deep level menu', () => {

    const items = [
      {
        ID: 1,
        url: 'test-a',
        title: 'Test A',
        child_items: [
          {
            ID: 3,
            url: 'test-a-a',
            title: 'Test A-A',
          }
        ]
      }
    ]

    const vm = Factory(slug, items)

    expect(vm.find(
      GetDeepLevel(2)
    ).exists()).toBe(true)

  })

  it('it generates 4 deep level menu', () => {

    const items = [
      {
        ID: 1,
        url: 'test-a',
        title: 'Test A',
        child_items: [
          {
            ID: 2,
            url: 'test-a-a',
            title: 'Test A-A',
            child_items: [
              {
                ID: 3,
                url: 'test-a-a',
                title: 'Test A-A',
                child_items: [
                  {
                    ID: 4,
                    url: 'test-a-a',
                    title: 'Test A-A',
                    child_items: [
                      {
                        ID: 5,
                        url: 'test-a-a',
                        title: 'Test A-A',
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]

    const vm = Factory(slug, items)

    expect(vm.find(
      GetDeepLevel(5)
    ).exists()).toBe(true)

  })

})