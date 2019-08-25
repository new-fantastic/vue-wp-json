import { isLoaderRequestElement, LoaderRequestElement } from "../../../types";
import { ModulePrefix } from "../../../";
import ResolveRoute from "../../../util/ResolveRoute";

const buildCreated = (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  prefetchTest: Boolean = false
) => {
  return async function() {
    if (typeof loaderRequest === "string") {
      if (
        prefetchTest &&
        this.$store.state[`${ModulePrefix}_post`].types.pages &&
        this.$store.state[`${ModulePrefix}_post`].types.pages[
          ResolveRoute(loaderRequest, this.$route)
        ]
      ) {
        return;
      }
      await this.$store.dispatch(`${ModulePrefix}_post/load`, {
        slug: ResolveRoute(loaderRequest, this.$route),
        type: "pages",
        embed: false
      });
    } else if (isLoaderRequestElement(loaderRequest)) {
      const isPost = "type" in loaderRequest;
      const contentType = isPost ? loaderRequest.type : "pages";

      if (
        prefetchTest &&
        this.$store.state[`${ModulePrefix}_post`].types[contentType] &&
        this.$store.state[`${ModulePrefix}_post`].types[contentType][
          ResolveRoute(loaderRequest.slug, this.$route)
        ]
      ) {
        return;
      }

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

export default buildCreated;
