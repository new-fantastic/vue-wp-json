import { FetchHookTypes, LoaderRequestElement } from "../../types";

import fhtCreated from "./fetchHookTypes/Created";
import fhtAsyncData from "./fetchHookTypes/AsyncData";
import fhtVoidAsyncData from "./fetchHookTypes/VoidAsyncData";

export default (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  fht: FetchHookTypes = FetchHookTypes.Created
) => {
  switch (fht) {
    case FetchHookTypes.Created:
      return fhtCreated(loaderRequest);
    case FetchHookTypes.AsyncData:
      return fhtAsyncData(loaderRequest);
    case FetchHookTypes.VoidAsyncData:
      return fhtVoidAsyncData(loaderRequest);
    default:
      throw new Error("FetchHookType" + fht + " does not exist");
  }
};
