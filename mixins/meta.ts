import ResolveRoute from "../util/ResolveRoute";
import { MetaConfig } from "../types";

export default (type: string, key: string, metaConfig?: MetaConfig) => ({
  metaInfo() {
    const plainObject = ResolveRoute(key, this.$route);
    if (this[plainObject] !== false && this[plainObject]) {
      const source =
        this[plainObject]._embedded &&
        this[plainObject]._embedded["wp:featuredmedia"] &&
        this[plainObject]._embedded["wp:featuredmedia"][0].media_details
          ? this[plainObject]._embedded["wp:featuredmedia"][0].media_details
          : null;

      let dt = [];
      if (source && source.sizes) {
        const altText = this[plainObject]._embedded["wp:featuredmedia"][0]
          .alt_text;
        const medium = source.sizes.hasOwnProperty("large")
          ? source.sizes.large
          : Object.values(source.sizes).reverse()[0];
        const mimeType = medium.mime_type.split("/")[0];

        switch (mimeType) {
          case "image":
            dt.push(
              { property: "og:image", content: medium.source_url },
              { name: "twitter:image", content: medium.source_url },
              { name: "twitter:card", content: "summary_large_image" },
              { property: "og:image:url", content: medium.source_url },
              {
                property: "og:image:width",
                content: medium.width
              },
              {
                property: "og:image:height",
                content: medium.height
              },
              { property: "og:image:type", content: medium.mime_type }
            );
            if (altText && altText.length > 0) {
              dt.push({ property: "og:image:alt", content: altText });
            }
            break;
          case "video":
            // TODO
            // dt.push(
            //   { property: "og:video", content: medium.guid.rendered },
            //   {
            //     property: "og:video:type",
            //     content: medium.media_details.mime_type
            //   },
            //   {
            //     property: "og:video:width",
            //     content: medium.media_details.width
            //   },
            //   {
            //     property: "og:video:height",
            //     content: medium.media_details.height
            //   },
            //   { property: "og:video:alt", content: medium.alt_text }
            // );
            break;
        }
      }

      const description =
        this[plainObject] &&
        this[plainObject].excerpt &&
        this[plainObject].excerpt.rendered &&
        this[plainObject].excerpt.rendered.length > 0
          ? {
              vmid: "description",
              name: "description",
              content: this[plainObject].excerpt.rendered.replace(
                /<(?:.|\n)*?>/gm,
                ""
              )
            }
          : {};

      let ogDesc = [];

      if ("content" in description) {
        ogDesc.push(
          { property: "og:description", content: description.content },
          { name: "twitter:description", content: description.content }
        );
      }

      let title = this[plainObject].title.rendered;
      let customTitle = false;

      if (metaConfig) {
        if (metaConfig.hasOwnProperty("titleTemplate")) {
          title = metaConfig.titleTemplate.replace("%s", title);
          customTitle = true;
        }
      }

      if (!customTitle && this.$wp.titleTemplate) {
        title = this.$wp.titleTemplate.replace("%s", title);
      }

      return {
        title,
        meta: [
          description,
          { property: "og:title", content: this[plainObject].title.rendered },
          { name: "twitter:title", content: this[plainObject].title.rendered },
          ...ogDesc,
          ...dt,
          { property: "og:type", content: type },
          { charset: "UTF-8" }
        ]
      };
    } else {
      return {
        meta: [{ charset: "UTF-8" }]
      };
    }
  }
});
