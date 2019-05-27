import meta from '../../mixins/meta'
import { ContentTypes } from '../../types'

export default (
  contentType) => {

    const type = contentType === ContentTypes.Page
      ? 'website'
      : 'article'

    const mixin: any = {
      mixins: [
        meta(type)
      ],
  
      head () {
        return this.head
      },
  
      computed: {
        head () {
          return meta(type).metaInfo.call(this);
        }
      }
    }

    return mixin
}