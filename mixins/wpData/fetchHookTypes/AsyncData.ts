import { LoaderRequestElement, MetaConfig } from "../../../types";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildAsyncData from "../builders/AsyncData";
import { FetchHookTypes } from "../../../types";

export default function(
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  setMeta: boolean | MetaConfig
) {
  const returnable: any = {
    asyncData: buildAsyncData(loaderRequest, FetchHookTypes.AsyncData)
  };
  if (setMeta) {
    const { type, slug } = pickMetaSource(loaderRequest);
    returnable.mixins = [
      Meta(type, slug, typeof setMeta === "boolean" ? undefined : setMeta)
    ];
  }

  return returnable;
}
