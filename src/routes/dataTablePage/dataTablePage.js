import React from 'react';
import { DataTable } from '../../components';
import { Table, Row, Col, Card, Select } from 'antd';
import './dataTablePage.less';

class DataTablePage extends React.Component {
  constructor (props) {
    super(props)
    this.state = { filterCase: {
      gender: '',
    } }
  }

  handleSelectChange = (gender) => {
    this.setState({
      filterCase: {
        gender,
      },
    })
  }
  render () {
	const {filterCase } = this.state;
	const staticDataTableProps = {
		dataSource: [{
			"key": "1",
			"name": "John Brown",
			"age": 24,
			"address": "New York"
		}, {
			"key": "2",
			"name": "Jim Green",
			"age": 23,
			"address": "London"
		}],
		columns: [{
			"title": "name",
			"dataIndex": "name"
		}, {
			"title": "Age",
			"dataIndex": "age"
		}, {
			"title": "Address",
			"dataIndex": "address"
		}],
		pagination: false,
	};

    const fetchDataTableProps = {
		fetch: {
			url: 'https://randomuser.me/api',
			data: {
				results: 10,
				//testPrams: 'test',
			},
			dataKey: 'results',
		},
		columns: [{
			title: 'Name',
			dataIndex: 'name',
			render: (text) => {
				return `${text.first} ${text.last}`;
			}
			}, {
				title: 'Phone',
				dataIndex: 'phone'
			}, {
				title: 'Gender',
				dataIndex: 'gender'
			}],
		rowKey: 'registered',
    };

    const caseChangeDataTableProps = {
      fetch: {
        url: 'https://randomuser.me/api',
        data: {
          results: 10,
          testPrams: 'test',
          ...filterCase,
        },
        dataKey: 'results',
      },
      columns: [
        { title: 'Name', dataIndex: 'name', render: (text) => `${text.first} ${text.last}` },
        { title: 'Phone', dataIndex: 'phone' },
        { title: 'Gender', dataIndex: 'gender' },
      ],
      rowKey: 'registered',
    };

    return (<div className="content-inner">
      <Row gutter={32}>
        {/*<Col lg={12} md={24}>
          <Card title="静态数据">
            <DataTable
              {...staticDataTableProps}
            />
          </Card>
        </Col>*/}
        <Col lg={12} md={24}>
          <Card title="远程数据">
            <DataTable
              {...fetchDataTableProps}
            />
          </Card>
        </Col>
        {/*<Col lg={12} md={24}>
          <Card title="参数变化">
            <Select placeholder="Please select gender" allowClear onChange={this.handleSelectChange} style={{ width: 200, marginBottom: 16 }}>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
            <DataTable
              {...caseChangeDataTableProps}
            />
          </Card>
        </Col>*/}
      </Row>
    </div>)
  }
}


export default DataTablePage
