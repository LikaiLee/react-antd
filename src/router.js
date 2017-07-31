import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'dva/router';
import App from './routes/app';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
}

const Routers = ({ history, app }) => {
	
	const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          registerModel(app, require('./models/indexModel'))
          cb(null, { component: require('./routes/indexPage/indexPage') })
        }, 'index')
      },
      childRoutes: [
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/loginModel'))
              cb(null, require('./routes/loginPage/loginPage'))
            }, 'login')
          },
        },
        {
          path: 'test',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/testModel'))
              cb(null, require('./routes/testPage/testPage'))
            }, 'test')
          },
        },
        {
          path: 'test1',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/testModel1'))
              cb(null, require('./routes/testPage1/testPage1'))
            }, 'test1')
          },
        },
        {
          path: 'dataTable',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/dataTableModel'))
              cb(null, require('./routes/dataTablePage/dataTablePage'))
            }, 'dataTable')
          },
        },
        {
          path: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/usersModel'))
              cb(null, require('./routes/usersPage/usersPage'))
            }, 'dataTable')
          },
        }, {
          path: 'users/:id',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/usersDetailModel'))
              cb(null, require('./routes/usersPage/detail/'))
            }, 'user-detail')
          },
        },
        {
          path: 'order',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/orderModel'))
              cb(null, require('./routes/orderPage/orderPage'))
            }, 'order')
          },
        },{
          path: 'comment',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/commentModel'))
              cb(null, require('./routes/commentPage/commentPage'))
            }, 'comment')
          },
        },
      ],
   },
  ];

	return <Router history={history} routes={routes} />;
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
