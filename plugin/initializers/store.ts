import { ModulePrefix } from "../../index";

import { media } from "../../store/media";
import { lang } from "../../store/lang";
import { post } from "../../store/post";
import { menu } from "../../store/menu";
import { meta } from "../../store/meta";
import { config } from "../../store/config";
import { layouts } from "../../store/layouts";

import { SET_CONFIG } from "../../store/config/mutation-types";

export const registerModules = (store: any) => {
  store.registerModule(`${ModulePrefix}_media`, media);
  store.registerModule(`${ModulePrefix}_menu`, menu);
  store.registerModule(`${ModulePrefix}_meta`, meta);
  store.registerModule(`${ModulePrefix}_post`, post);
  store.registerModule(`${ModulePrefix}_config`, config);
  store.registerModule(`${ModulePrefix}_layouts`, layouts);
};

export const loadBase = async (dispatch: Function, menuSlugs: any) => {
  // Menu slugs can be string, array or boolean
  await Promise.all([
    dispatch(`${ModulePrefix}_menu/load`, {
      menuSlugs: menuSlugs
    }),
    dispatch(`${ModulePrefix}_meta/load`),
    dispatch(`${ModulePrefix}_media/load`)
  ]);
};

export const setConfig = (commit: Function, config: any) => {
  commit(`${ModulePrefix}_config/${SET_CONFIG}`, config);
};
