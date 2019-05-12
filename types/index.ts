export interface WPRState {
  pages: Object,
  posts: Object,
  menus: Object,
  lang: String,
  meta: Object
}

export enum ContentTypes {
  Page,
  Post,
  Menu,
  Meta
}

export interface WPRMediaState {
  media: Object
}