import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Button } from 'antd';
import styles from './List.less';
import classnames from 'classnames';
import AnimTableBody from '../../components/DataTable/AnimTableBody';
import { Link } from 'dva/router';

const confirm = Modal.confirm;

const List = ({ onReply, isMotion, ...tableProps }) => {
  const handleClick = (record) => {
    onReply(record);
  }

  let columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 30
    },
    {
      title: 'comment_user',
      dataIndex: 'commentUser',
      key: 'commentUser',
    },
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      // width: 200,
      // height: 100,
      render: (text) => text.length > 20 ? text.substr(0, 20) + '...' : text,
    },
    {
      title: 'reply',
      dataIndex: 'reply',
      key: 'reply',
      render: (text) => text.length > 20 ? text.substr(0, 20) + '...' : text,
    },
    {
      title: 'comment_time',
      dataIndex: 'commentTime',
      key: 'commentTime',
      render: (time, record) => new Date(parseInt(time) * 1000).toLocaleString(),
    },
    {
      title: 'reply_time',
      dataIndex: 'replyTime',
      key: 'replyTime',
      render (time, record) {
        return new Date(parseInt(time) * 1000).toLocaleString();
      }
    },
     {
      title: '操作',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <Button type="primary" onClick={e => handleClick(record)}>回复</Button>;
      },
    },
  ];

  return (
    <div>
      <Table
        {...tableProps}
        className={classnames({ [styles.table]: true, [styles.motion]: isMotion })}
        bordered
        // scroll={{ x: 1250 }}
        columns={columns}
        simple
        rowKey={(record) => {
          return record.id;
        }}
      />
    </div>
  );
};

List.propTypes = {
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
};

export default List;
