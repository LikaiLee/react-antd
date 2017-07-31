import axios from 'axios';
import qs from 'qs';
import { getHziee } from '../services/userService';

export default {
  namespace: 'test1',
  state: {},
  subscriptions: {

    setup ({ dispatch }) {
      // console.log('model test setup');
      dispatch({ type: 'query' });
    },

  },
  effects: {
  	*query({ payload }, { call }) {
			
  	}
  },
  reducers: {},
}