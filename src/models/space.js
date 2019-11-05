export default {
  namespace: 'space',

  state: {
    name: 'space'
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