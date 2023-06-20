import {createStore} from 'vuex';
import {actions} from './actions';
import {mutations} from './mutations';
import {getters} from './getters';
import {shipment} from '@/store/shipment';

const state = {
  isLoading: false,
  textError: ''
};

export default createStore({
  state,
  actions,
  mutations,
  getters,
  modules: {
    shipment
  }
});
