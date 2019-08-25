import { mount } from "@vue/test-utils";
import BaseImage from "../../../components/Base/BaseImage.vue";

describe("BaseImage", () => {
  const WrappedImage = {
    components: {
      BaseImage
    },
    template: `
      <div>
        <BaseImage v-bind="$attrs" v-on="$listeners"/>
      </div>
    `
  };

  it("it render image with proper attributes and listeners", () => {
    const testsArray = [
      {
        item: {
          link: "http://google.com/"
        },
        $listeners: {},
        $attrs: {}
      },
      {
        item: {
          link: "https://onet.eu/"
        },
        $listeners: {
          click() {
            console.log("clicked!");
          }
        },
        $attrs: {
          id: 12
        }
      }
    ];

    for (let test of testsArray) {
      const wrapper = mount(WrappedImage, {
        propsData: {
          item: test.item
        },
        listeners: test.$listeners,
        attrs: {
          ...test.$attrs
        }
      });

      const img = wrapper.find("img");

      expect(img.exists()).toBe(true);
      expect(img.element.src).toBe(test.item.link);
    }
  });
});
