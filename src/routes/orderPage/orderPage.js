import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm } from 'antd';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';

const Order = ({ location, dispatch, order, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = order;
  const { pageSize } = pagination;
  // console.log('route', order);

  const modalProps = {
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['order/update'],
    title: `${modalType === 'create' ? '添加用户' : '修改信息'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `order/${modalType}`,
        payload: data,
      });
    },
    onCancel () {
      dispatch({
        type: 'order/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    aItem: list[0],
    loading: loading.effects['order/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      dispatch({
        type: 'order/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
        }
      });
    },
    onDeleteItem (id) {
      dispatch({
        type: 'order/delete',
        payload: id,
      });
    },
    onEditItem (item) {
      dispatch({
        type: 'order/showModal',
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
          type: 'order/updateState',
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
      let isSearchMode = value.orderNum ? true : false;
      dispatch({
        type: 'order/query',
        payload: {
          isSearchMode,
          ...value,
        }
      });
    },
    onAdd () {
      dispatch({
        type: 'order/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'order/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'order/multiDelete',
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

Order.propTypes = {
  order: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ order, loading }) => ({ order, loading }))(Order)
