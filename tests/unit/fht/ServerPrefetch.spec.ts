import FetchHookTypeServerPrefetch from "../../../mixins/wpData/fetchHookTypes/ServerPrefetch";
import pickMetaSource from "../../../mixins/PickMetaSource";
import { ModulePrefix } from "../../../";
import { ContentTypes, LoaderRequestElement } from "../../../types";

describe("FetchHookType: ServerPrefetch", () => {
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
        [`${ModulePrefix}_post`]: {
          types: {
            pages: {}
          }
        }
      }
    },
    $route: {}
  };

  it("builds proper Created for loaderRequest: string", () => {
    const slug = "slug";

    const value: any = FetchHookTypeServerPrefetch.call(that, slug);
    const spy = jest.spyOn(that.$store, "dispatch");
    value.serverPrefetch.call(that);

    expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_post/load`, {
      slug: slug,
      type: "pages",
      embed: false
    });
  });

  it("builds proper Created for loaderRequest: LoaderRequest", () => {
    const tests: LoaderRequestElement[] = [
      {
        slug: "slug",
        type: "posts"
      },
      {
        slug: "slug2",
        type: "pages"
      },
      {
        slug: "slug3"
      },
      {
        slug: "slug2",
        embed: true
      },
      {
        slug: "slug2",
        type: "acx",
        embed: true
      }
    ];

    for (let test of tests) {
      const value: any = FetchHookTypeServerPrefetch.call(that, test);
      const spy = jest.spyOn(that.$store, "dispatch");
      value.serverPrefetch.call(that);

      expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_post/load`, {
        slug: test.slug,
        type: "type" in test && test.type ? test.type : "pages",
        embed: "embed" in test && test.embed ? test.embed : false
      });
    }
  });

  it("builds proper Created for loaderRequest: Array<LoaderRequest | string>", async () => {
    const test = [
      {
        slug: "slug",
        type: "posts"
      },
      {
        slug: "slug2",
        type: "pages"
      },
      "slug3"
    ];

    const that2 = {
      $store: {
        dispatch(state, payload) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve();
            }, 100);
          });
        },
        state: {
          [`${ModulePrefix}_post`]: {
            types: {
              pages: {},
              posts: {}
            }
          }
        }
      }
    };

    const value: any = FetchHookTypeServerPrefetch.call(that2, test);
    const spy = jest.spyOn(that2.$store, "dispatch");
    await value.serverPrefetch.call(that2);

    for (let i = 0, len = test.length; i < len; i++) {
      expect(spy).toHaveBeenNthCalledWith(i + 1, `${ModulePrefix}_post/load`, {
        slug: typeof test[i] === "string" ? test[i] : test[i].slug,
        type:
          typeof test[i] !== "string" && "type" in test[i]
            ? test[i].type
            : "pages",
        embed:
          typeof test[i] === "string"
            ? false
            : "embed" in test[i] && test.embed
            ? test.embed
            : false
      });
    }
  });

  it("throws error when buildCreated gets a bad argument", async () => {
    let error;
    try {
      const value: any = FetchHookTypeServerPrefetch.call(that, [155, 12]); // Bad arg
      await value.serverPrefetch.call(that);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });

  it("returns Meta if needed", async () => {
    const slug = "slug";

    const value: any = FetchHookTypeServerPrefetch.call(that, slug, true);
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

    const value: any = FetchHookTypeServerPrefetch.call(that, slug, false);
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
});
