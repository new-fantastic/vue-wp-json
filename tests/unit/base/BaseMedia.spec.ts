import { shallowMount } from "@vue/test-utils";
import BaseMedia from "../../../components/Base/BaseMedia.vue";

describe("BaseMedia", () => {
  it("it chooses proper component", () => {
    const instance = shallowMount(BaseMedia, {
      propsData: {
        item: {
          mime_type: "image/jpeg"
        }
      }
    });

    expect(instance.vm.component).toBe("BaseImage");

    const instance2 = shallowMount(BaseMedia, {
      propsData: {
        item: {
          mime_type: "video/mp4",
          media_details: {
            width: 200,
            height: 200
          },
          link: "abc"
        }
      }
    });

    expect(instance2.vm.component).toBe("BaseVideo");
  });
});
