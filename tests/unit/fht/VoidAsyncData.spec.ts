import FetchHookTypeVoidAsyncData from "../../../mixins/wpData/fetchHookTypes/VoidAsyncData";
import { ModulePrefix } from "../../../";

describe("FetchHookType: VoidAsyncData", () => {
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

  it("returns asyncData which does not return any value", async () => {
    const slug = "slug";
    const neededValue = "abc";

    that.$store.state[`${ModulePrefix}_page`].page[slug] = neededValue;

    const value: any = FetchHookTypeVoidAsyncData.call(that, slug);
    const instance = await value.asyncData({ store: that.$store });
    expect(instance).toBeUndefined();
  });

  it("returns Meta if needed", async () => {
    const slug = "slug";

    const value: any = FetchHookTypeVoidAsyncData.call(that, slug, true);
    let was = false;
    if (value.hasOwnProperty("mixins")) {
      for (let mixin of value.mixins) {
        if (mixin.hasOwnProperty("metaInfo")) {
          was = true;
          break;
        }
      }
    }
    expect(was).toBeTruthy();
  });

  it("does not return Meta if not needed", async () => {
    const slug = "slug";

    const value: any = FetchHookTypeVoidAsyncData.call(that, slug, false);
    let was = false;
    if (value.hasOwnProperty("mixins")) {
      for (let mixin of value.mixins) {
        if (mixin.hasOwnProperty("metaInfo")) {
          was = true;
          break;
        }
      }
    }
    expect(was).toBeFalsy();
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
