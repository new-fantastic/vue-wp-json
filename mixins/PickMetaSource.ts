import {
  ContentTypes,
  isLoaderRequestElement,
  FetchHookTypes,
  LoaderRequestElement
} from "../types";

function pickMetaSource(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) {
  let type = "pages";

  if (typeof loaderRequest === "string") {
    return {
      slug: loaderRequest,
      type
    };
  } else if (isLoaderRequestElement(loaderRequest)) {
    if (loaderRequest.hasOwnProperty("post")) {
      type = loaderRequest.post;
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
        type = current.type;
      }

      if (
        isLoaderRequestElement(request) &&
        "meta" in request &&
        request.meta === true
      ) {
        type = current.type;
        return {
          slug: tmp,
          type
        };
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
