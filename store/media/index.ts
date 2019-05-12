import { Module } from 'vuex'
import { mutations } from './mutations'
import { WPRMediaState } from '../../types'
import { actions } from './actions'
import { state } from './state'

export const mediaModule: Module<WPRMediaState, any> = {
  namespaced: true,
  state,
  mutations,
  actions
}