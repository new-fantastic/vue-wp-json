import meta from '../../mixins/meta'
import { ContentTypes } from '../../types'

export default (
  contentType, metaSource: string) => {

    const type = contentType === ContentTypes.Page
      ? 'website'
      : 'article'

    const mixin: any = {
      mixins: [
        meta(type, metaSource)
      ],
  
      head () {
        return this.head
      },
  
      computed: {
        head () {
          return meta(type, metaSource).metaInfo.call(this);
        }
      }
    }

    return mixin
}