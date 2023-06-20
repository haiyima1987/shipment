export const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setApiError(state, error) {
    state.textError = error;
  }
}
