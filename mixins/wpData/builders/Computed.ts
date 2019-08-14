import {
  isLoaderRequestElement,
  LoaderRequestElement
} from "../../../types";
import { ModulePrefix } from "../../../";
import ResolveRoute from '../../../util/ResolveRoute'

const buildComputed = function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) {
  let computed = {};
  
  if (typeof loaderRequest === "string") {

    if (loaderRequest.trim() !== '') {
      computed[loaderRequest] = function() {
        return this.$store.state[`${ModulePrefix}_post`].types.hasOwnProperty(
          "pages"
        ) && this.$store.state[`${ModulePrefix}_post`].types.pages[loaderRequest]
          ? this.$store.state[`${ModulePrefix}_post`].types.pages[loaderRequest]
          : null;
      };
    }

    return computed;

  } else if (isLoaderRequestElement(loaderRequest)) {

    const contentType: string =
      "type" in loaderRequest ? loaderRequest.type : "pages";

    const dataName: string =
      "dataName" in loaderRequest ? loaderRequest.dataName : loaderRequest.slug;

    if(dataName.trim() !== '') {
      if (loaderRequest.slug === '') {

        computed[dataName] = function() {
          return this.$store.state[`${ModulePrefix}_post`].types[contentType] &&
            this.$store.state[`${ModulePrefix}_post`].types[contentType]
            ? this.$store.state[`${ModulePrefix}_post`].types[contentType]
            : null;
        };

      } else {

        computed[dataName] = function() {
          return this.$store.state[`${ModulePrefix}_post`].types[contentType] &&
            this.$store.state[`${ModulePrefix}_post`].types[contentType][
              ResolveRoute(loaderRequest.slug, this.$route)
            ]
            ? this.$store.state[`${ModulePrefix}_post`].types[contentType][
                ResolveRoute(loaderRequest.slug, this.$route)
              ]
            : null;
        };

      }
    }

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
