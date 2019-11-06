import { getPermission } from '../services/layout'
import { message as msg } from 'antd'

export default {
  namespace: 'layout',

  state: {
    name: 'layout'
  },

  subscriptions: {

  },

  effects: {
    *getPermissionList({ payload }, { call, put }, ) {
      const { code, data, message } = yield call(getPermission, payload)
      if (code === 200) {
        yield put({
          type: 'save',
          payload: { list: data || [] }
        })
      } else {
        msg.error(message)
      }
    }
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