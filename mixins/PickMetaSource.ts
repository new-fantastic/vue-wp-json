import {
  isLoaderRequestElement,
  LoaderRequestElement
} from "../types";
import ResolveRoute from '../util/ResolveRoute'

const pickMetaSource = (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) => {
  let type = "pages";

  if (typeof loaderRequest === "string") {
    return {
      slug: loaderRequest,
      type
    };
  } else if (isLoaderRequestElement(loaderRequest)) {
    if (loaderRequest.hasOwnProperty("type")) {
      type = loaderRequest.type;
    }
    return {
      slug:
        "dataName" in loaderRequest
          ? loaderRequest.dataName
          : loaderRequest.slug,
      type
    };
  } else if (Array.isArray(loaderRequest)) {
    let current = null;

    const reversedLoader = [...loaderRequest].reverse();
    for (let request of reversedLoader) {
      let tmp = pickMetaSource(request);
      if (current === null) {
        current = tmp;
      }

      if (
        isLoaderRequestElement(request) &&
        "meta" in request &&
        request.meta === true
      ) {
        return tmp
      }
    }

    return current;
  } else {
    throw new Error(
      "FetchHookTypeCreated: loaderRequest cannot be " + typeof loaderRequest
    );
  }
}

export default pickMetaSource;
