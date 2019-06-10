import { shallowMount } from '@vue/test-utils'
import BaseVideo from '../../components/Base/BaseVideo.vue'

describe('BaseVideo', () => {
  
  it('it render video with proper attributes and listeners', () => {
    
    const testsArray = [
      { 
        item: {
          link: 'http://google.com/'
        },
        mediaDetails: {
          width: 420,
          height: 500,
          mime_type: 'video/mp4'
        },
        $listeners: {},
        $attrs: {}
      },
      { 
        item: {
          link: 'https://onet.eu/'
        },
        mediaDetails: {
          width: 1420,
          height: 2500,
          mime_type: 'video/avg'
        },
        $listeners: {
          click () {
            console.log('clicked!')
          }
        },
        $attrs: {
          id: 126
        }
      }
    ]

    for (let test of testsArray) {
      const wrapper = shallowMount(BaseVideo, {
        propsData: {
          mediaDetails: test.mediaDetails,
          item: test.item
        },
        listeners: test.$listeners,
        attrs: {
          ...test.$attrs
        }
      })

      const video = wrapper.find('video')

      expect(video.exists()).toBe(true)
      expect(video.vm.$attrs).toEqual(test.$attrs)
      expect(video.element.width).toBe(test.mediaDetails.width)
      expect(video.element.height).toEqual(test.mediaDetails.height)

      const source = video.find('source')

      expect(source.exists()).toBe(true)
      expect(source.element.src).toEqual(test.item.link)
      expect(source.element.type).toEqual(test.mediaDetails.mime_type)
    }

  })

})