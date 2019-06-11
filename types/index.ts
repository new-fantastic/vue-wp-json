export enum ContentTypes {
  Page,
  Post,
  Menu,
  Meta
}

export enum FetchHookTypes {
  Created,
  AsyncData,
  VoidAsyncData
}

export interface LoaderRequestElement {
  slug: string
  meta?: Boolean,
  dataName?: string,
  post?: Boolean
}
