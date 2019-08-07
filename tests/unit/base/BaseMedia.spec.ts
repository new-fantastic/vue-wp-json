import { mount, createLocalVue } from '@vue/test-utils'
import { ModulePrefix } from '../../../index'
import BaseMedia from '../../../components/Base/BaseMedia'
import BaseImage from '../../../components/Base/BaseImage.vue'
import BaseVideo from '../../../components/Base/BaseVideo.vue'

describe('BaseMedia', () => {
  
  it('it chooses proper component', () => {
    const mediaId = 1

    const localVue = createLocalVue()

    const WrappedBaseMedia = {
      components: { BaseMedia },
      template: `
        <div><BaseMedia :id="`+ mediaId +`"/></div>
      `
    }

    const testsArray = [
      { mime_type: 'image/jpeg', cmp: BaseImage },
      { mime_type: 'video/mp4', cmp: BaseVideo },
      { mime_type: 'not-existing-type/mp4', error: true },
    ]

    for(let test of testsArray) {

      const wrapper = mount(WrappedBaseMedia, {
        mocks: {
          $store: {
            state: {
              [`${ModulePrefix}_media`]: {
                media: {
                  [mediaId]: {
                    media_details: {},
                    mime_type: test.mime_type
                  }
                }
              }
            }
          }
        }
      })
  
      if (!('error' in test)) {
        expect(wrapper.contains(test.cmp)).toBe(true)
      } else {
        expect(wrapper.find('span').exists()).toBe(true)
      }

    }

  })

})