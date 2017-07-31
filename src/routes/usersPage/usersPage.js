import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm } from 'antd';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';

const Users = ({ location, dispatch, users, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = users;
  const { pageSize } = pagination;
  // console.log('route', users);

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['users/update'],
    title: `${modalType === 'create' ? '添加用户' : '修改信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `users/${modalType}`,
        payload: data,
      });
    },
    onCancel () {
      dispatch({
        type: 'users/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    aItem: list[0],
    loading: loading.effects['users/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
    	// console.log(page);
    	dispatch({
    		type: 'users/query',
    		payload: {
    			page: page.current,
    			pageSize: page.pageSize,
    		}
    	});
      // const { query, pathname } = location;
      // console.log(page)
      // console.log(location)
      // console.log(query)
      /*dispatch(routerRedux.push({
        pathname,
        query: {
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        },
      }));*/
    },
    onDeleteItem (id) {
      dispatch({
        type: 'users/delete',
        payload: id,
      });
    },
    onEditItem (item) {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      });
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'users/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        });
      },
    },
  }
  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
    	// reset 判断
    	let isSearchMode = value.roleName ? true : false;
    	dispatch({
    		type: 'users/query',
    		payload: {
    			isSearchMode,
    			...value,
    		}
    	});
      /*dispatch(routerRedux.push({
        pathname: location.pathname,
        payload: {
        	isSearch: true,
        },
        query: {
          ...value,
          page: 1,
          pageSize,
        },
      }));*/
    },
    /*onSearch (fieldsValue) {
    	console.log('onSearch')
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/users',
        query: {
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        },
      })) : dispatch(routerRedux.push({
        pathname: '/users',
      }))
    },*/
    onAdd () {
      dispatch({
        type: 'users/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'users/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'users/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

  return (
    <div className="content-inner">
       {<Filter {...filterProps} /> } 
      {
         selectedRowKeys.length > 0 &&
           <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
             <Col>
               {`选中 ${selectedRowKeys.length} 个项目 `}
               <Popconfirm title={`确认删除这${selectedRowKeys.length}个项目？`} placement="left" onConfirm={handleDeleteItems}>
                 <Button type="primary" size="large" style={{ marginLeft: 8 }}>删除</Button>
               </Popconfirm>
             </Col>
           </Row>
      }
      {<List {...listProps} />}
      {modalVisible && <Modal {...modalProps} />}
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ users, loading }) => ({ users, loading }))(Users)
