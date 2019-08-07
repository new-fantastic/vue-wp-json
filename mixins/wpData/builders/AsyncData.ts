import {
  ContentTypes,
  isLoaderRequestElement,
  FetchHookTypes,
  LoaderRequestElement
} from "../../../types";
import { ModulePrefix } from "../../../";

const buildAsyncData = function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  fht: FetchHookTypes = FetchHookTypes.AsyncData
) {
  return async function({ store }) {
    if (typeof loaderRequest === "string") {
      await store.dispatch(`${ModulePrefix}_page/load`, {
        slug: loaderRequest,
        type: ContentTypes.Page
      });

      if (fht === FetchHookTypes.AsyncData) {
        return {
          [loaderRequest]: store.state[`${ModulePrefix}_page`].page[
            loaderRequest
          ]
            ? store.state[`${ModulePrefix}_page`].page[loaderRequest]
            : null
        };
      }
    } else if (isLoaderRequestElement(loaderRequest)) {
      const isPost = "post" in loaderRequest && loaderRequest.post;
      const contentType = isPost ? "post" : "page";
      await store.dispatch(`${ModulePrefix}_${contentType}/load`, {
        slug: loaderRequest.slug,
        type: isPost ? ContentTypes.Post : ContentTypes.Page
      });

      if (fht === FetchHookTypes.AsyncData) {
        const dataName =
          "dataName" in loaderRequest && loaderRequest.dataName
            ? loaderRequest.dataName
            : loaderRequest.slug;

        return {
          [dataName]: store.state[`${ModulePrefix}_${contentType}`][
            contentType
          ][loaderRequest.slug]
            ? store.state[`${ModulePrefix}_${contentType}`][contentType][
                loaderRequest.slug
              ]
            : null
        };
      }
    } else if (Array.isArray(loaderRequest)) {
      let response = {};

      for (let request of loaderRequest) {
        if (typeof request !== "string" && !isLoaderRequestElement(request)) {
          throw new Error("FetchHookTypeVoidAsyncData: Bad loaderRequest");
        }
        let localResponse = await buildAsyncData
          .call(this, request, FetchHookTypes.AsyncData)
          .call(this, { store });

        response = {
          ...response,
          ...localResponse
        };
      }

      return response;
    } else {
      throw new Error(
        "FetchHookTypeVoidAsyncData: loaderRequest cannot be " +
          typeof loaderRequest
      );
    }
  };
};

export default buildAsyncData;
