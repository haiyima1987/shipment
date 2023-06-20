import apiHandler from '@/utils/handlers/ApiHandler';

export const actions = {
  getShipments(context, {page, pageSize}) {
    return apiHandler.get('/shipments', {page, pageSize}).then(response => {
      if (apiHandler.isSuccess(response.status)) {
        return response.data;
      }
      return false;
    });
  },
  createShipment({commit}, data) {
    const formData = apiHandler.parseFormData(data);
    return apiHandler.post('/shipments/create', formData).then(response => {
      return !!apiHandler.isSuccess(response.status);
    }).catch(error => {
      commit('setApiError', error.response.data);
    });
  }
}
