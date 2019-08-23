import buildAsyncData from "../../../mixins/wpData/builders/AsyncData";
import { ModulePrefix } from "../../../";
import {
  LoaderRequestElement,
  LoaderRequestElementWithValue,
  FetchHookTypes
} from "../../../types";

describe("AsyncData Builder", () => {
  it("asyncData returns proper value for loaderRequest: string", async () => {
    const slug = "slug";
    const store = {
      state: {
        [`${ModulePrefix}_post`]: {
          types: {
            pages: {
              [slug]: "secret_value"
            }
          }
        }
      },
      dispatch: () => Promise.resolve()
    };

    const value: any = buildAsyncData(slug, FetchHookTypes.AsyncData);
    expect(value).toBeDefined();

    const exec = await value({ store });
    expect(slug in exec).toBeTruthy();
    expect(exec[slug]).toBe(
      store.state[`${ModulePrefix}_post`].types.pages[slug]
    );
  });

  it("asyncData returns null for loaderRequest: string if it is empty", async () => {
    const slug = "slug";
    const store = {
      state: {
        [`${ModulePrefix}_post`]: {
          types: {
            pages: {}
          }
        }
      },
      dispatch: () => Promise.resolve()
    };

    const value: any = buildAsyncData(slug, FetchHookTypes.AsyncData);
    expect(value).toBeDefined();

    const exec = await value({ store });
    expect(slug in exec).toBeTruthy();
    expect(exec[slug]).toBeNull();
  });

  it("asyncData returns proper value for loaderRequest: LoaderRequestElement", async () => {
    const requests: LoaderRequestElementWithValue[] = [
      {
        slug: "slug1",
        dataName: "other1",
        type: "posts",
        value: "abc"
      },
      {
        slug: "slug2",
        value: "abc"
      },
      {
        slug: "slug3",
        dataName: "other2",
        value: "abc"
      },
      {
        slug: "slug4",
        type: "posts",
        value: "abc"
      }
    ];
    const store = {
      state: {
        [`${ModulePrefix}_post`]: {
          types: {
            posts: {},
            pages: {}
          }
        }
      },
      dispatch: () => Promise.resolve()
    };

    for (let request of requests) {
      const dataName = "dataName" in request ? request.dataName : request.slug;

      const contentType =
        "type" in request && request.type ? request.type : "pages";

      store.state[`${ModulePrefix}_post`].types[contentType][request.slug] =
        request.value;

      const value: any = buildAsyncData(request, FetchHookTypes.AsyncData);
      expect(value).toBeDefined();

      const exec = await value({ store });
      expect(dataName in exec).toBeTruthy();
      expect(exec[dataName]).toBe(request.value);
    }
  });

  it("asyncData returns proper value for loaderRequest: Array<LoaderRequestElement | string>", async () => {
    const requestsToSend: Array<LoaderRequestElement | string> = [
      {
        slug: "slug1",
        dataName: "other1",
        type: "posts"
      },
      {
        slug: "slug2"
      },
      {
        slug: "slug3",
        dataName: "other2"
      },
      {
        slug: "slug4",
        type: "posts"
      },
      "hello"
    ];

    const requestsLocal: Array<LoaderRequestElementWithValue | string> = [
      {
        slug: "slug1",
        dataName: "other1",
        type: "posts",
        value: "abc"
      },
      {
        slug: "slug2",
        value: "abc"
      },
      {
        slug: "slug3",
        dataName: "other2",
        value: "abc"
      },
      {
        slug: "slug4",
        type: "posts",
        value: "abc"
      },
      "hello"
    ];

    const stringsValue: string = "abc";

    const store = {
      state: {
        [`${ModulePrefix}_post`]: {
          types: {
            posts: {},
            pages: {}
          }
        }
      },
      dispatch: () => Promise.resolve()
    };

    for (let request of requestsLocal) {
      if (typeof request === "string") {
        store.state[`${ModulePrefix}_post`].types.pages[request] = stringsValue;
      } else {
        const contentType =
          "type" in request && request.type ? request.type : "pages";

        store.state[`${ModulePrefix}_post`].types[contentType][request.slug] =
          request.value;
      }
    }

    const value: any = buildAsyncData(requestsToSend, FetchHookTypes.AsyncData);
    expect(value).toBeDefined();

    const exec = await value({ store });
    expect(Object.keys(exec).length).toBe(requestsToSend.length);

    for (let request of requestsLocal) {
      if (typeof request === "string") {
        expect(request in exec).toBeTruthy();
        expect(exec[request]).toBe(stringsValue);
      } else {
        const dataName =
          "dataName" in request ? request.dataName : request.slug;

        // const contentType =
        //   "type" in request && request.type ? request.type : "pages";

        expect(dataName in exec).toBeTruthy();
        expect(exec[dataName]).toBe(request.value);
      }
    }
  });
});
