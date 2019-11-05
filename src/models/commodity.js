export default {
  namespace: 'commodity',

  state: {
    name: 'commodity'
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