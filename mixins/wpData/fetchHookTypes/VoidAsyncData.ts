import {
  ContentTypes,
  isLoaderRequestElement,
  FetchHookTypes,
  LoaderRequestElement
} from "../../../types";
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
  const asyncData = buildAsyncData.call(
    this,
    loaderRequest,
    FetchHookTypes.VoidAsyncData
  );
  const computed = buildComputed.call(this, loaderRequest);
  const meta = pickMetaSource.call(this, loaderRequest);

  return {
    asyncData,
    computed,
    mixins: [Meta(ContentTypes.Page, meta)]
  };
}
