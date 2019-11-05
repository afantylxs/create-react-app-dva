export default {
  namespace: 'layout',

  state: {
    name: 'layout'
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