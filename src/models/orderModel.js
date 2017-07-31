import modelExtend from 'dva-model-extend';
import { message } from 'antd';
import { query, remove, update, create } from '../services/orderService';
import { pageModel } from './common';
import { config } from '../utils';

const { prefix } = config;

export default modelExtend(pageModel, {
  namespace: 'order',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    isMotion: localStorage.getItem(`${prefix}orderIsMotion`) === 'true',
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/order') {
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
      // const { selectedRowKeys } = yield select(_ => _.user);
      if (data.success && data.status == 1) {
      	message.success(data.info, 2);
        // yield put({ type: 'updateState', payload: { selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload) } })
        yield put({ type: 'query' })
      } else {
        message.error(data.info, 2);
      }
    },

    *'multiDelete' ({ payload }, { call, put }) {
      const ids = payload.ids.join(',').trim();
      // console.log(ids);
      const data = yield call(remove, { id: ids });
      // console.log(data);
      if (data.success && data.status == 1) {
      	message.success(data.info, 2);
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } });
        yield put({ type: 'query' });
      } else {
        message.error(data.info, 2);
      }
    },

    *create ({ payload }, { call, put }) {
    	// console.log(payload)
      const data = yield call(create, payload);
	 if (data.success && data.status == 1) {
      	message.success(data.info, 2);
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        message.error(data.info, 2);
      }
    },

    *update ({ payload }, { select, call, put }) {
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
      localStorage.setItem(`${prefix}orderIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
