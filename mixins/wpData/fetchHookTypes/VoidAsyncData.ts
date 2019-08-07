import { FetchHookTypes, LoaderRequestElement } from "../../../types";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildComputed from "../builders/Computed";
import buildAsyncData from "../builders/AsyncData";

export default function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) {
  const asyncData = buildAsyncData(loaderRequest, FetchHookTypes.VoidAsyncData);
  const computed = buildComputed(loaderRequest);
  const { type, slug } = pickMetaSource(loaderRequest);

  return {
    asyncData,
    computed,
    mixins: [Meta(type, slug)]
  };
}
