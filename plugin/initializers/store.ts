import { ModulePrefix } from '../../index'

import { media }from '../../store/media'
import { lang }from '../../store/lang'
import { post }from '../../store/post'
import { page }from '../../store/page'
import { menu }from '../../store/menu'
import { meta }from '../../store/meta'

import { SET_LANG } from '../../store/lang/mutation-types'

export const registerModules = (store: any) => {
  store.registerModule(`${ModulePrefix}_lang`, lang)
  store.registerModule(`${ModulePrefix}_media`, media)
  store.registerModule(`${ModulePrefix}_menu`, menu)
  store.registerModule(`${ModulePrefix}_meta`, meta)
  store.registerModule(`${ModulePrefix}_page`, page)
  store.registerModule(`${ModulePrefix}_post`, post)
}

export const loadBase = async (dispatch: Function, menuSlugs: any) => {
  await Promise.all([
    dispatch(`${ModulePrefix}_menu/load`, {
      menuSlugs
    }),
    dispatch(`${ModulePrefix}_meta/load`),
    dispatch(`${ModulePrefix}_media/load`)
  ])
}

export const setLang = (commit: Function, lang: string) => {
  commit(`${ModulePrefix}_lang/${SET_LANG}`, lang)
}