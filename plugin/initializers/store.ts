import { EditablePluginConfig } from './../../types/index';
import { ModulePrefix } from "../../index";

import { post } from "../../store/post";
import { menu } from "../../store/menu";
import { meta } from "../../store/meta";
import { config } from "../../store/config";

import { SET_CONFIG } from "../../store/config/mutation-types";

export const registerModules = (store: any, useMenu: Boolean = true) => {
  if (useMenu)
    store.registerModule(`${ModulePrefix}_menu`, menu);
  
  store.registerModule(`${ModulePrefix}_meta`, meta);
  store.registerModule(`${ModulePrefix}_post`, post);
  store.registerModule(`${ModulePrefix}_config`, config);
};

export const loadBase = async (dispatch: Function, menuSlugs: any) => {
  // Menu slugs can be string, array or boolean
  if (!menuSlugs) {
    await dispatch(`${ModulePrefix}_meta/load`)
  } else {
    await Promise.all([
      dispatch(`${ModulePrefix}_menu/load`, {
        menuSlugs
      }),
      dispatch(`${ModulePrefix}_meta/load`)
    ]);
  }
};

export const setConfig = (commit: Function, config: EditablePluginConfig) => {
  commit(`${ModulePrefix}_config/${SET_CONFIG}`, config);
};
