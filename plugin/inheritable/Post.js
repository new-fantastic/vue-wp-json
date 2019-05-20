import { ContentTypes } from '../../types'
import meta from '../../mixins/meta'
import Abstract from './Abstract'
import Vue from 'vue'

export default {
  mixins: [ 
    Abstract(ContentTypes.Page, true, true),
    meta('article') 
  ]
};