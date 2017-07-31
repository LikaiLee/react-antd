import React from 'react'
import { Icon, Spin } from 'antd'
import styles from './index.less'

const Error = () => <div className="content-inner">
  <div className={styles.error}>
    {/*<Icon type="meh-o" />*/}
    <Spin size="large" />
    {/*<h1>404 Not Found</h1>*/}
  </div>
</div>

export default Error
