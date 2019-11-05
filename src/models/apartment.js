export default {
  namespace: 'apartment',

  state: {
    name: 'apartment'
  },

  subscriptions: {

  },

  effects: {

  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}