import {
  isLoaderRequestElement,
  LoaderRequestElement,
  MetaConfig
} from "../../../types";
import { ModulePrefix } from "../../../";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildComputed from "../builders/Computed";
import ResolveRoute from "../../../util/ResolveRoute";

const buildCreated = (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) => {
  return async function() {
    if (typeof loaderRequest === "string") {
      await this.$store.dispatch(`${ModulePrefix}_post/load`, {
        slug: ResolveRoute(loaderRequest, this.$route),
        type: "pages",
        embed: false
      });
    } else if (isLoaderRequestElement(loaderRequest)) {
      const isPost = "type" in loaderRequest;
      const contentType = isPost ? loaderRequest.type : "pages";

      await this.$store.dispatch(`${ModulePrefix}_post/load`, {
        slug: ResolveRoute(loaderRequest.slug, this.$route),
        type: contentType,
        embed: loaderRequest.hasOwnProperty("embed")
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
    | Array<LoaderRequestElement | string>,
  setMeta: boolean | MetaConfig
) => {
  const returnable: any = {
    created: buildCreated(loaderRequest),
    computed: buildComputed(loaderRequest)
  };
  if (setMeta) {
    const { type, slug } = pickMetaSource(loaderRequest);
    returnable.mixins = [
      Meta(type, slug, typeof setMeta === "boolean" ? undefined : setMeta)
    ];
  }

  return returnable;
};
