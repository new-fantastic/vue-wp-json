import { FetchHookTypes, LoaderRequestElement, MetaConfig } from "../../types";

import fhtCreated from "./fetchHookTypes/Created";
import fhtAsyncData from "./fetchHookTypes/AsyncData";
import fhtVoidAsyncData from "./fetchHookTypes/VoidAsyncData";

export default (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  fht: FetchHookTypes = FetchHookTypes.Created,
  setMeta: boolean | MetaConfig = true
) => {

  switch (fht) {
    case FetchHookTypes.Created:
      return fhtCreated(loaderRequest, setMeta);
    case FetchHookTypes.AsyncData:
      return fhtAsyncData(loaderRequest, setMeta);
    case FetchHookTypes.VoidAsyncData:
      return fhtVoidAsyncData(loaderRequest, setMeta);
    default:
      throw new Error("FetchHookType" + fht + " does not exist");
  }
};
