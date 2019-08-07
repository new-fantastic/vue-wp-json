import FetchHookTypeCreated from "../../../mixins/wpData/fetchHookTypes/Created";
import pickMetaSource from "../../../mixins/PickMetaSource";
import { ModulePrefix } from "../../../";
import { ContentTypes, LoaderRequestElement } from "../../../types";

describe("FetchHookType: Created", () => {
  const that = {
    $store: {
      dispatch(state, payload) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 100);
        });
      }
    }
  };

  it("builds proper Created for loaderRequest: string", () => {
    const slug = "slug";

    const value: any = FetchHookTypeCreated.call(that, slug);
    const spy = jest.spyOn(that.$store, "dispatch");
    const invoke = value.created.call(that);

    expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_post/load`, {
      slug: slug,
      type: "pages"
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
      }
    ];

    for (let test of tests) {
      const value: any = FetchHookTypeCreated.call(that, test);
      const spy = jest.spyOn(that.$store, "dispatch");
      value.created.call(that);

      expect(spy).toHaveBeenCalledWith(`${ModulePrefix}_post/load`, {
        slug: test.slug,
        type: "type" in test && test.type ? test.type : "pages"
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
        }
      }
    };

    const value: any = FetchHookTypeCreated.call(that2, test);
    const spy = jest.spyOn(that2.$store, "dispatch");
    await value.created.call(that2);

    for (let i = 0, len = test.length; i < len; i++) {
      expect(spy).toHaveBeenNthCalledWith(i + 1, `${ModulePrefix}_post/load`, {
        slug: typeof test[i] === "string" ? test[i] : test[i].slug,
        type:
          typeof test[i] !== "string" && "type" in test[i]
            ? test[i].type
            : "pages"
      });
    }
  });

  it("throws error when buildCreated gets a bad argument", async () => {
    let error;
    try {
      const value: any = FetchHookTypeCreated.call(that, [155, 12]); // Bad arg
      await value.created.call(that);
    } catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Error);
  });
});
