import { Store } from 'vuex';

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
  slug: string;
  meta?: Boolean;
  dataName?: string;
  type?: string;
  embed?: boolean
}

export function isLoaderRequestElement(
  object: any
): object is LoaderRequestElement {
  return typeof object === "object" && "slug" in object;
}

export interface LoaderRequestElementWithValue extends LoaderRequestElement {
  value: any;
}

export interface MetaConfig {
  titleTemplate?: string
}

export interface PluginConfig {
  url: string,
  lang: string,
  store: Store<any> | Boolean,
  requestPrefix?: string,
  menus?: Boolean | string | Array<string>,
  titleTemplate?: string
}