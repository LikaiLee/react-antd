import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import styles from './index.less';

const Detail = ({ usersDetail }) => {
  const { data } = usersDetail;
  const content = [];
  for (let key in data) {
    if ({}.hasOwnProperty.call(data, key)) {
      let keyText = '';
      let dataText = String(data[key]);
      switch(key) {
        case 'address':
          keyText = '地址'; break;
        case 'addtime':
          keyText = '修改时间';
          dataText = new Date(parseInt(data[key]) * 1000).toLocaleString();
          break;
        case 'age':
          keyText = '年龄'; break;
        case 'avtar':
          keyText = '头像';
          dataText = <img src={data[key]} />;
          break;
        case 'creditcode':
          keyText = '信誉分'; break;
        case 'finishOrderCount':
          keyText = '已完成订单'; break;
        case 'gender':
          keyText = '性别'; break;
        case 'id':
          keyText = 'id'; break;
        case 'isvip':
          keyText = '是否为VIP'; break;
        case 'password':
          keyText = '密码'; break;
        case 'phone':
          keyText = '电话'; break;
        case 'rank':
          keyText = '等级'; break;
        case 'roleName':
          keyText = '昵称'; break;
      }
      content.push(
        <div key={key} className={styles.item}>
          <div>{keyText}</div>
          <div>{dataText}</div>
        </div>
      );
    }
  }
  return (<div className="content-inner">
    <div className={styles.content}>
      {content}
    </div>
  </div>)
}

Detail.propTypes = {
  usersDetail: PropTypes.object,
  loading: PropTypes.bool,
}

export default connect(({ usersDetail, loading }) => ({ usersDetail, loading: loading.models.usersDetail }))(Detail)
