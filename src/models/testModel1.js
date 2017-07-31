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
			const data = {
				TextBox1: '15905717',
				TextBox2: 'Hdu153510',
				__VIEWSTATE: '/wEPDwUKLTY4Mjg3NzI5NGRk+yAaA352cuwlk0iYbcRxiF6UJVc=',
				__EVENTVALIDATION: '/wEWCgL0h9HvCQLs0bLrBgLs0fbZDAK/wuqQDgKAqenNDQLN7c0VAuaMg+INAveMotMNAoznisYGArursYYIsRYr0nH6eJRR4eD1mC6FIuZeuVY=',
				RadioButtonList1: '学生',
				Button1: ''
			}
      // http://jxgl.hziee.edu.cn/default2.aspx
      //TextBox1=15905717&TextBox2=Hdu153510&__VIEWSTATE=/wEPDwUKLTY4Mjg3NzI5NGRk+yAaA352cuwlk0iYbcRxiF6UJVc=&__EVENTVALIDATION=/wEWCgL0h9HvCQLs0bLrBgLs0fbZDAK/wuqQDgKAqenNDQLN7c0VAuaMg+INAveMotMNAoznisYGArursYYIsRYr0nH6eJRR4eD1mC6FIuZeuVY=&RadioButtonList1=%D1%A7%C9%FA&Button1=
			//const result = yield call(getHziee, data);
      const result = axios.get('http://jxgl.hziee.edu.cn/');
			console.log(result);
  	}
  },
  reducers: {},
}