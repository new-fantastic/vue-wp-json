import { ContentTypes } from '../types';

export const ContentTypeToString = (ct: ContentTypes): string => {
  switch(ct) {

    case ContentTypes.Page: 
      return 'page'
    
    case ContentTypes.Post: 
      return 'post'

    default:
      throw new Error('[FILTER] Not supported ContentType: ' + ct)

  }
}

export const StringToContentType = (tmp: string): ContentTypes => {
  const str = tmp.trim().toLowerCase()
  switch(str) {

    case 'page': 
      return ContentTypes.Page
    
    case 'post': 
      return ContentTypes.Post

    default:
      throw new Error('[FILTER] Not support ContentType: ' + tmp)

  }
}