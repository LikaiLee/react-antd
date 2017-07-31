import modelExtend from 'dva-model-extend';
import { message } from 'antd';
import { query, remove, update } from '../services/commentService';
import { pageModel } from './common';
import { config } from '../utils';

const { prefix } = config;

export default modelExtend(pageModel, {
  namespace: 'comment',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}commentIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/comment') {
          dispatch({
            type: 'query',
            payload: location.query,
          })
        }
      })
    },
  },

  effects: {

    *query ({ payload }, { call, put }) {
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.list,
            pagination: {
              current: payload ? Number(payload.page) : 1,
              pageSize: payload ? Number(payload.pageSize) : 10,
              total: data.list.length,
            },
          },
        });
      }
    },

    *'delete' ({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload });
      // console.log(data);
      if (data.success && data.status == 1) {
      	message.success(data.info, 2);
        yield put({ type: 'query' })
      } else {
        message.error(data.info, 2);
      }
    },

    *'multiDelete' ({ payload }, { call, put }) {
      const ids = payload.ids.join(',').trim();
      const data = yield call(remove, { id: ids });
      if (data.success && data.status == 1) {
      	message.success(data.info, 2);
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } });
        yield put({ type: 'query' });
      } else {
        message.error(data.info, 2);
      }
    },

    *add ({ payload }, { select, call, put }) {
    	// console.log(payload)
    	
      const data = yield call(update, payload);
      if (data.success && data.status == 1) {
      	message.success(data.info, 2);
        yield put({ type: 'hideModal' });
        yield put({ type: 'query' });
      } else {
        message.error(data.info, 2);
      }
    },

  },

  reducers: {

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },

    switchIsMotion (state) {
      localStorage.setItem(`${prefix}commentIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
