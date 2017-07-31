import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Input, Cascader, Switch } from 'antd';

const Search = Input.Search;

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

const Filter = ({
  isMotion,
  switchIsMotion,
  onFilterChange,
  filter,
  form: {
    getFieldDecorator,
    getFieldsValue,
    setFieldsValue,
  },
}) => {
  const handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [createTime[0].format('YYYY-MM-DD'), createTime[1].format('YYYY-MM-DD')]
    }
    return fields
  }

  const handleSubmit = () => {
    let fields = getFieldsValue();
    // fields = handleFields(fields)
    onFilterChange(fields);
  }

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      
    }
  }
    setFieldsValue(fields);
    handleSubmit();
  }

  const handleChange = (key, values) => {
    let fields = getFieldsValue()
    fields[key] = values
    // fields = handleFields(fields)
    onFilterChange(fields)
  }

  return (
    <Row gutter={24}>
      <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
        {getFieldDecorator('commentUser')(<Search placeholder="用户" size="large" onSearch={handleSubmit} />)}
      </Col>
      <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <Button type="primary" size="large" className="margin-right" onClick={handleSubmit}>查询</Button>
            <Button size="large" onClick={handleReset}>重置</Button>
          </div>
          <div>
            <Switch style={{ marginRight: 16 }} size="large" defaultChecked={isMotion} onChange={switchIsMotion} checkedChildren={'Motion'} unCheckedChildren={'Motion'} />
          </div>
        </div>
      </Col>
    </Row>
  )
}

Filter.propTypes = {
  isMotion: PropTypes.bool,
  switchIsMotion: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
