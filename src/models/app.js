import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { parse } from 'qs';
import { config } from '../utils';
import { getLoginedUserInfo, logout } from '../services/loginService';

const { prefix, adminMenus, guestMenus } = config;

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: '主页',
        router: '/',
      },
    ],
    menuPopoverVisible: false,
    siderFold: localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem(`${prefix}navOpenKeys`)) || [],
  },
  subscriptions: {

    setup ({ dispatch }) {
      dispatch({ type: 'checkLogin' })
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300);
      }
    },

  },
  effects: {

    *checkLogin ({
      payload,
    }, { call, put }) {
      // 检查是否登录
      // {"success":true,"message":"OK","statusCode":200,
      // "data":{"id":1,"password":"admin","role":"admin","username":"admin"},
      //"info":"已登录","status":1}
      
      const { success, data, info } = yield call(getLoginedUserInfo);
        
      // const success = true, data = {"id":1,"password":"admin","role":"admin","username":"admin"}, info = '已登录';

      // console.log(`%c${info}`, 'color:red;')
      if (success && data) {
        let permissions = {
          role: data.role
        };
        let user = {
          id: data.id,
          username: data.username
        };
        let menu = permissions.role === 'admin' ? adminMenus : guestMenus;
        permissions.visit = menu.map(item => item.id);

        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
          },
        })
        
        // console.log("permissions", permissions)
        // console.log('menu', menu)
        // console.log('users', user)
        if (location.pathname === '/login') {
          window.location = location.origin;
        }
      } else {
        message.info(info, 2);
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname;
          window.location = `${location.origin}/login?from=${from}`;
        }
      }
    },

    *logout ({
      payload,
    }, { call, put }) {
      // console.log(payload)
      const { success, data} = yield call(logout);
      if (success && data) {
        yield put({ type: 'checkLogin' });
      } else {
        throw 'error';
      }
      
    },

    *changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield(select(_ => _));
      const isNavbar = document.body.clientWidth < 769;
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar });
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider (state) {
      localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },

    switchTheme (state) {
      localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      };
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
  },
}
