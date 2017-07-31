import { message } from 'antd';
import { login } from '../services/userService';

export default {
  namespace: 'test',
  state: {
  	myParams: 'hello params'
  },
  subscriptions: {

    setup ({ dispatch }) {
      // console.log('model test setup')
    },

  },
  effects: {

    *testClickHandler ({ 
      payload
    }, { call, put } ) {
    	// console.log('testClickHandler')
    	let myParams = 'date = ' + new Date().getTime() / 1000
    	// console.log(myParams);
    	yield put({ type : 'handleChangeValue', payload: {
    		myParams
    	} })
      //const data = yield call(login, {data: 'testData'});
      //console.log(data)
      //message.info('list.length = ' + data.list.length)
	  
    },


  },
  reducers: {
  	handleChangeValue (state, { payload }) {
  		// console.log(state)
		// console.log(payload)
		return {
			...state,
			...payload
		}
  	},

  },
}