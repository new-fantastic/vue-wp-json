import { shallowMount } from '@vue/test-utils'
import BaseImage from '../../../components/Base/BaseImage.vue'

describe('BaseImage', () => {
  
  it('it render image with proper attributes and listeners', () => {
    
    const testsArray = [
      { 
        item: {
          link: 'http://google.com/'
        },
        mediaDetails: {},
        $listeners: {},
        $attrs: {}
      },
      { 
        item: {
          link: 'https://onet.eu/'
        },
        mediaDetails: {},
        $listeners: {
          click () {
            console.log('clicked!')
          }
        },
        $attrs: {
          id: 12
        }
      }
    ]

    for (let test of testsArray) {
      const wrapper = shallowMount(BaseImage, {
        propsData: {
          mediaDetails: test.mediaDetails,
          item: test.item
        },
        listeners: test.$listeners,
        attrs: {
          ...test.$attrs
        }
      })

      const img = wrapper.find('img')

      expect(img.exists()).toBe(true)
      expect(img.element.src).toBe(test.item.link)
      expect(img.vm.$attrs).toEqual(test.$attrs)
      // expect(img.vm.$listeners).toEqual(test.$listeners)
    }

  })

})