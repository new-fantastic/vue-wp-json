import {
  ContentTypes,
  isLoaderRequestElement,
  FetchHookTypes,
  LoaderRequestElement
} from "../../../types";
import { ModulePrefix } from "../../../";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildComputed from "../builders/Computed";

const buildCreated = (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) => {
  return async function() {
    if (typeof loaderRequest === "string") {
      await this.$store.dispatch(`${ModulePrefix}_page/load`, {
        slug: loaderRequest,
        type: ContentTypes.Page
      });
    } else if (isLoaderRequestElement(loaderRequest)) {
      const isPost = "post" in loaderRequest && loaderRequest.post;
      const contentType = isPost ? "post" : "page";
      await this.$store.dispatch(`${ModulePrefix}_${contentType}/load`, {
        slug: loaderRequest.slug,
        type: isPost ? ContentTypes.Post : ContentTypes.Page
      });
    } else if (Array.isArray(loaderRequest)) {
      const requests = [];
      for (let request of loaderRequest) {
        if (typeof request !== "string" && !isLoaderRequestElement(request)) {
          throw new Error("FetchHookType Created: Bad loaderRequest");
        }
        requests.push(buildCreated.call(this, request).call(this));
      }
      await Promise.all(requests);
    } else {
      throw new Error(
        "FetchHookTypeCreated: loaderRequest cannot be " + typeof loaderRequest
      );
    }
  };
};

export default (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) => {
  const created = buildCreated(loaderRequest);
  const computed = buildComputed(loaderRequest);
  const meta = pickMetaSource(loaderRequest);

  return {
    created,
    computed,
    mixins: [Meta(ContentTypes.Page, meta)]
  };
};
