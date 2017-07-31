const apiPrefix = 'api';
const domin = 'http://localhost:2333';

module.exports = {
  name: 'Admin',
  prefix: 'Admin',
  footerText: 'Admin  © 2017',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  openPages: ['/login'],
  apiPrefix: apiPrefix,
  api: {
    getLoginedUserInfoAPI: `${apiPrefix}/adminInfo/getLoginedUserInfo`,
    userLoginAPI: `${apiPrefix}/adminInfo/login`,
    userLogoutAPI: `${apiPrefix}/adminInfo/logout`,
    usersApi: `${apiPrefix}/userInfo/data`,
    getUserApi: `${domin}/${apiPrefix}/userInfo/getUser`,
    orderApi: `${apiPrefix}/orderNew/order`,
    getOrderApi: `${domin}/${apiPrefix}/orderNew/getOrder`,
    commentApi: `${apiPrefix}/userComment/comment`,
  },
  adminMenus: [{
    'id': '1',
    'icon': 'laptop',
    'name': '管理员',
    'route': '/'
  }, {
    'id': '4',
    'icon': 'database',
    'bpid': '1',
    'name': '表格',
    'route': '/dataTable',
  }, {
    'id': '5',
    'icon': 'user',
    'bpid': '1',
    'name': '用户',
    'route': '/users',
  },
  {
    id: '51',
    mpid: '-1',
    bpid: '5',
    name: '详细信息',
    route: '/users/:id',
  },
  {
    id: '6',
    icon: 'solution',
    bpid: '1',
    name: '订单',
    route: '/order',
  },
  {
    id: '7',
    icon: 'message',
    bpid: '1',
    name: '反馈',
    route: '/comment',
  },
  /*{
    'id': '2',
    'bpid': '1',
    'icon': 'user',
    'name': '测试',
    'route': '/test'
  }, */{
    'id': '3',
    'bpid': '1',
    'icon': 'folder',
    'name': '目录',
    // 'route': ''
  }, {
    'id': '31',
    'bpid': '3', // 地址显示
    'mpid': '3', // mpid的子项
    'icon': 'wifi',
    'name': '测试1',
    'route': '/test1'
  }],
  guestMenus: [{
    'id': '1',
    'icon': 'laptop',
    'name': '普通用户',
    'route': '/'
  }, {
    'id': '2',
    'bpid': '1',
    'icon': 'user',
    'name': '测试',
    'route': '/test'
  }, {
    'id': '3',
    'bpid': '1',
    'icon': 'folder',
    'name': '目录',
    // 'route': ''
  }, {
    'id': '31',
    'bpid': '3', // 地址显示
    'mpid': '3', // mpid的子项
    'icon': 'wifi',
    'name': '测试1',
    'route': '/test1'
  }],
}