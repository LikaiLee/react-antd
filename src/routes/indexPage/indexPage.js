import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card, Button } from 'antd'
import Container from './Container'
import styles from './indexPage.less';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const data = [
  {
    name: 'A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  }, {
    name: 'B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  }, {
    name: 'C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  }, {
    name: 'D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  }, {
    name: 'E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  }, {
    name: 'F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  }, {
    name: 'G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const colProps = {
  lg: 12,
  md: 24,
}

const SimpleLineChart = () => (
  <Container>
    <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotoneX" dataKey="pv" stroke="#8884d8" activeDot={{
        r: 8,
      }} />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      <Line type="monotone" dataKey="amt" stroke="#ff3300" />
    </LineChart>
  </Container>
)
const SimpleBarChart = () => (
  <Container>
    <BarChart data={data} margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  </Container>
)

const EditorPage = () => (
  <div className="content-inner">
    <Button type="primary" size="large" style={{
      position: 'absolute',
      right: 0,
      top: -48,
    }}>
      <a href="#">Button</a>
    </Button>
    <Row gutter={32}>
      <Col {...colProps}>
        <Card title="曲线图">
          <SimpleLineChart />
        </Card>
      </Col>
      <Col {...colProps}>
        <Card title="柱状图">
          <SimpleBarChart />
        </Card>
      </Col>
    </Row>
  </div>
)

export default EditorPage
