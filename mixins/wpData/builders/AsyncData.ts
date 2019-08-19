import {
  isLoaderRequestElement,
  FetchHookTypes,
  LoaderRequestElement
} from "../../../types";
import { ModulePrefix } from "../../../";
import ResolveRoute from '../../../util/ResolveRoute'

const buildAsyncData = function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  fht: FetchHookTypes = FetchHookTypes.AsyncData
) {
  return async function({ store, route }) {
    if (typeof loaderRequest === "string") {
      const resolvedLoaderRequest = ResolveRoute(loaderRequest, route)
      await store.dispatch(`${ModulePrefix}_post/load`, {
        slug: resolvedLoaderRequest,
        type: "pages",
        embed: false
      });

      if (fht === FetchHookTypes.AsyncData) {
        return {
          [resolvedLoaderRequest]: store.state[`${ModulePrefix}_post`].types.pages[
            resolvedLoaderRequest
          ]
            ? store.state[`${ModulePrefix}_post`].types.pages[resolvedLoaderRequest]
            : null
        };
      }
    } else if (isLoaderRequestElement(loaderRequest)) {
      const isPost = "type" in loaderRequest && loaderRequest.type;
      const contentType = isPost ? loaderRequest.type : "pages";
      const resolvedLoaderRequest = ResolveRoute(loaderRequest.slug, route)

      await store.dispatch(`${ModulePrefix}_post/load`, {
        slug: resolvedLoaderRequest,
        type: contentType,
        embed: loaderRequest.hasOwnProperty('embed')
      });

      if (fht === FetchHookTypes.AsyncData) {
        const dataName =
          "dataName" in loaderRequest && loaderRequest.dataName
            ? loaderRequest.dataName
            : resolvedLoaderRequest;

        return {
          [dataName]: store.state[`${ModulePrefix}_post`].types[contentType][
            resolvedLoaderRequest
          ]
            ? store.state[`${ModulePrefix}_post`].types[contentType][
                resolvedLoaderRequest
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
