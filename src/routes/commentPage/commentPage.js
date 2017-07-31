import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm } from 'antd';
import List from './List';
import Filter from './Filter';
import Modal from './Modal';

const Comment = ({ location, dispatch, comment, loading }) => {
  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = comment;
  const { pageSize } = pagination;

  const modalProps = {
    item: currentItem,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects['comment/add'],
    title: '回复',
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      dispatch({
        type: `comment/add`,
        payload: data,
      });
    },
    onCancel () {
      dispatch({
        type: 'comment/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    loading: loading.effects['comment/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      dispatch({
        type: 'comment/query',
        payload: {
          page: page.current,
          pageSize: page.pageSize,
        }
      });
    },
    onReply (item) {
      dispatch({
        type: 'comment/showModal',
        payload: {
          currentItem: item,
        },
      });
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'comment/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        });
      },
    },
  }
  const filterProps = {
    isMotion,
    onFilterChange (value) {
      // reset 判断
      let isSearchMode = value.commentUser ? true : false;
      dispatch({
        type: 'comment/query',
        payload: {
          isSearchMode,
          ...value,
        }
      });
    },
    switchIsMotion () {
      dispatch({ type: 'comment/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'comment/multiDelete',
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

Comment.propTypes = {
  comment: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ comment, loading }) => ({ comment, loading }))(Comment)
