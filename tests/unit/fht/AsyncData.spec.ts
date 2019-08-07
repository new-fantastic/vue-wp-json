import FetchHookTypeAsyncData from "../../../mixins/wpData/fetchHookTypes/AsyncData";
import pickMetaSource from "../../../mixins/PickMetaSource";
import { ModulePrefix } from "../../../";
import { ContentTypes, LoaderRequestElementWithValue } from "../../../types";

describe("FetchHookType: AsyncData", () => {
  const that = {
    $store: {
      dispatch(state, payload) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 100);
        });
      },
      state: {
        [`${ModulePrefix}_page`]: {
          page: {}
        },
        [`${ModulePrefix}_post`]: {
          post: {}
        }
      }
    }
  };

  it("returns asyncData", () => {
    const slug = "slug";
    const neededValue = "abc";

    that.$store.state[`${ModulePrefix}_page`].page[slug] = neededValue;

    const value: any = FetchHookTypeAsyncData.call(that, slug);
    const spy = jest.spyOn(that.$store, "dispatch");

    expect(value.hasOwnProperty("asyncData"));
    expect(typeof value.asyncData).toBe("function");
  });

  // it("builds proper AsyncData for loaderRequest: string", async () => {
  //   const slug = "slug";
  //   const neededValue = "abc";

  //   that.$store.state[`${ModulePrefix}_page`].page[slug] = neededValue;

  //   const value: any = FetchHookTypeAsyncData.call(that, slug);
  //   const spy = jest.spyOn(that.$store, "dispatch");
  //   const invoke = await value.asyncData({ store: that.$store });

  //   expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_page/load`, {
  //     slug: slug,
  //     type: ContentTypes.Page
  //   });
  //   expect(invoke.hasOwnProperty(slug)).toBeTruthy();
  //   expect(invoke.slug).toBe(neededValue);
  // });

  // it("builds proper AsyncData for loaderRequest: LoaderRequestElement", async () => {
  //   // slug: string
  //   // meta ?: Boolean,
  //   //   dataName ?: string,
  //   //   post ?: Boolean
  //   const lre: LoaderRequestElementWithValue[] = [
  //     {
  //       slug: 'a',
  //       meta:
  //     }
  //   ]
  //   const neededValue = "abc";

  //   that.$store.state[`${ModulePrefix}_page`].page[slug] = neededValue;

  //   const value: any = FetchHookTypeAsyncData.call(that, slug);
  //   const spy = jest.spyOn(that.$store, "dispatch");
  //   const invoke = await value.asyncData({ store: that.$store });

  //   expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_page/load`, {
  //     slug: slug,
  //     type: ContentTypes.Page
  //   });
  //   expect(invoke.hasOwnProperty(slug)).toBeTruthy();
  //   expect(invoke.slug).toBe(neededValue);
  // });
});
