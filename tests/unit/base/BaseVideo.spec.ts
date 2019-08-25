import { mount } from "@vue/test-utils";
import BaseVideo from "../../../components/Base/BaseVideo.vue";

describe("BaseVideo", () => {
  const WrappedVideo = {
    components: {
      BaseVideo
    },
    template: `
      <div>
        <BaseVideo v-bind="$attrs" v-on="$listeners"/>
      </div>
    `
  };

  it("it render video with proper attributes and listeners", () => {
    const testsArray = [
      {
        item: {
          link: "http://google.com/",
          media_details: {
            width: 420,
            height: 500,
            mime_type: "video/mp4"
          }
        },
        $listeners: {},
        $attrs: {}
      },
      {
        item: {
          link: "https://onet.eu/",
          media_details: {
            width: 1420,
            height: 2500,
            mime_type: "video/avg"
          }
        },
        $listeners: {
          click() {
            console.log("clicked!");
          }
        },
        $attrs: {
          id: 126
        }
      }
    ];

    for (let test of testsArray) {
      const wrapper = mount(WrappedVideo, {
        propsData: {
          item: test.item
        },
        listeners: test.$listeners,
        attrs: {
          ...test.$attrs
        }
      });

      const video = wrapper.find("video");

      expect(video.exists()).toBe(true);
      expect(video.element.width).toBe(test.item.media_details.width);
      expect(video.element.height).toEqual(test.item.media_details.height);

      const source = video.find("source");

      expect(source.exists()).toBe(true);
      expect(source.element.src).toEqual(test.item.link);
      expect(source.element.type).toEqual(test.item.media_details.mime_type);
    }
  });
});
