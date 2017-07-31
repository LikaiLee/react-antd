import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryURL, config } from '../utils';
import { login } from '../services/loginService';

const { prefix } = config;

export default {
  namespace: 'login',
  state: {
  	loginLoading: false,
  },
  subscriptions: {

    setup ({ dispatch }) {
      // console.log('登录模块')
    },

  },
  effects: {
  	*login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' });
      const data = yield call(login, payload);
      yield put({ type: 'hideLoginLoading' });
      if (data.success && data.status === 1) {
        message.success(data.info, 1);
        const from = queryURL('from');
        yield put({ type: 'app/checkLogin' });
        if (from) {
          yield put(routerRedux.push(from));
        } else {
          yield put(routerRedux.push('/'));
        }
      } else {
        message.error(data.info);
      }
    },
  },
  reducers: {
  	showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}