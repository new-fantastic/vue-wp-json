import meta from "../../mixins/meta";

const plainObject = "abc";

jest.mock("../../util/ResolveRoute", () => (a, b) => "abc");

describe("Meta", () => {
  it("attaches proper title, og:title and twiter:title", () => {
    const title = "My title";

    const that = {
      [plainObject]: {
        title: {
          rendered: title
        }
      },
      $wp: {}
    };

    const exec: any = meta("article", "").metaInfo.call(that);

    expect(exec.hasOwnProperty("title")).toBeTruthy();
    expect(exec.hasOwnProperty("meta")).toBeTruthy();
    expect(exec.meta.find(v => v.property === "og:title").content).toBe(title);
    expect(exec.meta.find(v => v.name === "twitter:title").content).toBe(title);
    expect(exec.title).toBe(title);
  });

  it("attaches proper description, og:description and twiter:description", () => {
    const desc = "My title";

    const that = {
      [plainObject]: {
        excerpt: {
          rendered: desc
        },
        title: {
          rendered: desc
        }
      },
      $wp: {}
    };

    const exec: any = meta("article", "").metaInfo.call(that);

    expect(exec.hasOwnProperty("meta")).toBeTruthy();
    expect(exec.meta.find(v => v.property === "og:description").content).toBe(
      desc
    );
    expect(exec.meta.find(v => v.vmid === "description").content).toBe(desc);
    expect(
      exec.meta.find(v => v.name === "twitter:description" && !v.vmid).content
    ).toBe(desc);
  });

  it("attaches title template from config", () => {
    const desc = "My title";
    const template = "%s - MyPage";
    const target = "My title - MyPage";

    const that = {
      [plainObject]: {
        title: {
          rendered: desc
        }
      },
      $wp: {
        titleTemplate: template
      }
    };

    const exec: any = meta("article", "").metaInfo.call(that);

    expect(exec.hasOwnProperty("title")).toBeTruthy();
    expect(exec.title).toBe(target);
  });

  it("attaches title template from wpData", () => {
    const desc = "My title";
    const template = "%s - MyPage";
    const target = "My title - MyPage";

    const that = {
      [plainObject]: {
        title: {
          rendered: desc
        }
      },
      $wp: {}
    };

    const exec: any = meta("article", "", {
      titleTemplate: template
    }).metaInfo.call(that);

    expect(exec.hasOwnProperty("title")).toBeTruthy();
    expect(exec.title).toBe(target);
  });

  it("attaches title template from wpData over one from config", () => {
    const desc = "My title";
    const template = "%s - MyPage";
    const templateBad = "%s - BadTemplateMyPage";
    const target = "My title - MyPage";

    const that = {
      [plainObject]: {
        title: {
          rendered: desc
        }
      },
      $wp: {
        titleTemplate: templateBad
      }
    };

    const exec: any = meta("article", "", {
      titleTemplate: template
    }).metaInfo.call(that);

    expect(exec.hasOwnProperty("title")).toBeTruthy();
    expect(exec.title).toBe(target);
  });

  it("attaches proper images og an twitter tags", () => {
    const desc = "My title";
    const alt_text = "xyz";
    const imgUrl = "abc";
    const width = 300;
    const height = 400;
    const mime_type = "image/jpeg";

    const that = {
      [plainObject]: {
        title: {
          rendered: desc
        },
        _embedded: {
          "wp:featuredmedia": [
            {
              media_details: {
                sizes: {
                  large: {
                    source_url: imgUrl,
                    mime_type,
                    width,
                    height
                  }
                }
              },
              alt_text
            }
          ]
        }
      },
      $wp: {}
    };
    const exec: any = meta("article", "").metaInfo.call(that);

    expect(exec.hasOwnProperty("meta")).toBeTruthy();
    expect(exec.meta.find(v => v.property === "og:image").content).toBe(imgUrl);
    expect(exec.meta.find(v => v.property === "og:image:url").content).toBe(
      imgUrl
    );
    expect(exec.meta.find(v => v.property === "og:image:width").content).toBe(
      width
    );
    expect(exec.meta.find(v => v.property === "og:image:height").content).toBe(
      height
    );
    expect(exec.meta.find(v => v.property === "og:image:type").content).toBe(
      mime_type
    );
    expect(exec.meta.find(v => v.property === "og:image:alt").content).toBe(
      alt_text
    );
    expect(exec.meta.find(v => v.name === "twitter:image").content).toBe(
      imgUrl
    );
    expect(exec.meta.find(v => v.name === "twitter:card").content).toBe(
      "summary_large_image"
    );
  });
});
