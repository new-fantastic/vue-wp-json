import { LoaderRequestElement } from "../../../types";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildAsyncData from "../builders/AsyncData";

export default function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>
) {
  const asyncData = buildAsyncData(loaderRequest);
  const { type, slug } = pickMetaSource(loaderRequest);

  return {
    asyncData,
    mixins: [Meta(type, slug)]
  };
}
