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

export function isLoaderRequestElement(object: any): object is LoaderRequestElement {
  return typeof object === 'object' && 'slug' in object
}

export interface LoaderRequestElementWithValue extends LoaderRequestElement{
  value: any
}