import {
  ContentTypes,
  isLoaderRequestElement,
  FetchHookTypes,
  LoaderRequestElement
} from "../../../types";
import { ModulePrefix } from "../../../";

const buildComputed = function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) {
  let computed = {};

  if (typeof loaderRequest === "string") {
    computed[loaderRequest] = function() {
      return this.$store.state[`${ModulePrefix}_page`].page[loaderRequest]
        ? this.$store.state[`${ModulePrefix}_page`].page[loaderRequest]
        : null;
    };

    return computed;
  } else if (isLoaderRequestElement(loaderRequest)) {
    const contentType: string =
      "post" in loaderRequest && loaderRequest.post ? "post" : "page";

    const dataName: string =
      "dataName" in loaderRequest ? loaderRequest.dataName : loaderRequest.slug;

    computed[dataName] = function() {
      return this.$store.state[`${ModulePrefix}_${contentType}`][contentType][
        loaderRequest.slug
      ]
        ? this.$store.state[`${ModulePrefix}_${contentType}`][contentType][
            loaderRequest.slug
          ]
        : null;
    };

    return computed;
  } else if (Array.isArray(loaderRequest)) {
    for (let request of loaderRequest) {
      computed = {
        ...computed,
        ...buildComputed.call(this, request)
      };
    }
  } else {
    throw new Error(
      "FetchHookTypeCreated: loaderRequest cannot be " + typeof loaderRequest
    );
  }

  return computed;
};

export default buildComputed;
