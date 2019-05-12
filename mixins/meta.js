export default type => ({
  metaInfo() {
    if(this.wpData !== false) {
      const iId = Number(this.wpData.featured_media)

      let dt = []
      if (iId > 0) {
        const medium = this.$store.state.wpr_media.media[iId]
        const mimeType = medium.mime_type.split('/')[0]
        switch(mimeType) {
          case 'image':
            dt.push(
              { property: 'og:image', content: medium.link },
              { property: 'og:image:url', content: medium.link },
              { property: 'og:image:width', content: medium.media_details.width },
              { property: 'og:image:height', content: medium.media_details.height },
              { property: 'og:image:type', content: medium.mime_type },
              { property: 'og:image:alt', content: medium.alt_text }
            )
            break;
          case 'video':
            dt.push(
              { property: 'og:video', content: medium.guid.rendered },
              { property: 'og:video:type', content: medium.media_details.mime_type },
              { property: 'og:video:width', content: medium.media_details.width },
              { property: 'og:video:height', content: medium.media_details.height },
              { property: 'og:video:alt', content: medium.alt_text },
            )
            break;
        }
      }

      const description = this.wpData.excerpt.rendered && this.wpData.excerpt.rendered.length > 0 
        ? { vmid: 'description', name: 'description', content: this.wpData.excerpt.rendered.replace(/<(?:.|\n)*?>/gm, '') }
        : {}

      let ogDesc = {}

      console.log(description, 'DESC')

      if('content' in description) {
        ogDesc = { property: 'og:description', content: description.content }
      }

      return {
        title: this.wpData.title.rendered,
        meta: [
          description,
          { property: 'og:title', content: this.wpData.title.rendered },
          ogDesc,
          ...dt,
          { property: 'og:type', content: type}
        ]
      };
    } else {
      return {
        meta: [
          { charset: 'UTF-8' }
        ]
      }
    }
  }
})