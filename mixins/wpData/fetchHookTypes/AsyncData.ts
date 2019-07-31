import { ContentTypes, LoaderRequestElement } from "../../../types";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildAsyncData from "../builders/AsyncData";

export default function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) {
  const asyncData = buildAsyncData.call(this, loaderRequest);
  const meta = pickMetaSource.call(this, loaderRequest);

  return {
    asyncData,
    mixins: [Meta(ContentTypes.Page, meta)]
  };
}
