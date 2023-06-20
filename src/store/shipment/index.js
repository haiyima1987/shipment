import {actions} from './actions';
import {mutations} from './mutations';
import {getters} from './getters';

export const state = {}

const namespaced = false

export const shipment = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
