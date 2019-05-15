import { ContentTypes } from '../../types'
import meta from '../../mixins/meta'
import Abstract from './Abstract'

export default {
  mixins: [ 
    Abstract(ContentTypes.Post),
    meta('article') 
  ]
};