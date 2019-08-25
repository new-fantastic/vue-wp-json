import { LoaderRequestElement, MetaConfig } from "../../../types";
import Meta from "../../meta";
import pickMetaSource from "../../PickMetaSource";
import buildComputed from "../builders/Computed";
import buildCreated from "../builders/Created";

export default (
  loaderRequest:
    | string
    | LoaderRequestElement
    | Array<LoaderRequestElement | string>,
  setMeta: boolean | MetaConfig
) => {
  const returnable: any = {
    created: buildCreated(loaderRequest, true),
    serverPrefetch: buildCreated(loaderRequest, false),
    computed: buildComputed(loaderRequest)
  };
  if (setMeta) {
    const { type, slug } = pickMetaSource(loaderRequest);
    returnable.mixins = [
      Meta(type, slug, typeof setMeta === "boolean" ? undefined : setMeta)
    ];
  }

  return returnable;
};
