import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';
import { getUser } from '../services/usersService';

export default {

  namespace: 'usersDetail',

  state: {
    data: {},
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(() => {
        const match = pathToRegexp('/users/:id').exec(location.pathname)
        if (match) {
          dispatch({ type: 'query', payload: { username: match[1] } })
        }
      })
    },
  },

  effects: {
    *query ({
      payload,
    }, { call, put }) {
      const { data, success, info } = yield call(getUser, payload);
      if (success && data) {
        yield put({
          type: 'querySuccess',
          payload: {
            data,
          },
        })
      } else {
        message.info(info, 2);
      }
    },
  },

  reducers: {
    querySuccess (state, { payload }) {
      const { data } = payload;
      return {
        ...state,
        data,
      }
    },
  },
}
