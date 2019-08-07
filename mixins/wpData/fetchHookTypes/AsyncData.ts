import { LoaderRequestElement } from "../../../types";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildAsyncData from "../builders/AsyncData";

export default function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  setMeta: boolean
) {
  const returnable: any = {
    asyncData: buildAsyncData(loaderRequest)
  };
  if (setMeta) {
    const { type, slug } = pickMetaSource(loaderRequest);
    returnable.mixins = [Meta(type, slug)];
  }

  return returnable;
}
