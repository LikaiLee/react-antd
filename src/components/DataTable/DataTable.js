import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { request } from '../../utils';
import lodash from 'lodash';
import './DataTable.less';

class DataTable extends React.Component {
  constructor (props) {
    super(props);
    const { 
      dataSource,
      pagination = {
        showSizeChanger: true,// 每页显示数量
        showQuickJumper: true,// 跳转
        showTotal: total => {
          return `共 ${total} 条`;
        },
        current: 1, // 当前页
        total: 100 // 总页数
      },
    } = props;
    this.state = {
      loading: false,
      dataSource,
      pagination,
    };
  }

  componentDidMount () {
    if (this.props.fetch) {
      this.fetch()
    }
  }

  componentWillReceiveProps (nextProps) {
    const staticNextProps = lodash.cloneDeep(nextProps);
    delete staticNextProps.columns;
    const { columns, ...otherProps } = this.props;

    if (!lodash.isEqual(staticNextProps, otherProps)) {
      this.props = nextProps;
      this.fetch();
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = this.state.pagination;
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
      fetchData: {
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      },
    }, () => {
      this.fetch()
    });
  }

  fetch = () => {
    const { fetch: { url, data, dataKey } } = this.props;
    this.setState({ loading: true });
    this.promise = request({
      url,
      data: {
        ...data,
      },
    }).then((result) => {
      // console.log(result);
      if (!this.refs.DataTable) {
        return;
      }
      const { pagination } = this.state;
      pagination.total = result.total || pagination.total;
      this.setState({
        loading: false,
        dataSource: dataKey ? result[dataKey] : result.data,
        pagination,
      });
    });
  }

  render () {
    const { fetch, ...tableProps } = this.props;
    const { loading, dataSource, pagination } = this.state;

    return (<Table
      ref="DataTable"
      bordered
      loading={loading}
      onChange={this.handleTableChange}
      {...tableProps}
      pagination={pagination}
      dataSource={dataSource}
    />);
  }
}


DataTable.propTypes = {
  fetch: PropTypes.object,
  rowKey: PropTypes.string,
  pagination: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
  columns: PropTypes.array,
  dataSource: PropTypes.array,
}

export default DataTable
