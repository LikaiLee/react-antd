import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'dva';
import { Button, Form, Input } from 'antd';

const test = ({ 
  test,
	dispatch,
	form: {
    	getFieldDecorator,
      getFieldsValue,
    	validateFieldsAndScroll,
  	},
}) => {
  // console.log('test', test)

  let testClickHandler = () => {
  	validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({ type: 'test/testClickHandler', payload: values });
    })
  };

  let changeClick = (e) => {
      // console.log(e)
      dispatch({ type: 'test/handleChangeValue', payload: e });
  }


  return (
    <div>
      ./src/routes/testPage/test <br/>
      <div style={{color:'red', fontSize: '20px'}}>
      {test.myParams} <br/>
        {
          1==1?'YES':'NO'
        }
      </div>
      <Form>
		<Form.Item>
          {getFieldDecorator('myParams')(<Input size="large" placeholder="Param" />)}
        </Form.Item>
		<Button type="primary" size="large" onClick={testClickHandler}>Button</Button><br/><br/>
    <Button type="primary" size="large" onClick={()=>{changeClick(getFieldsValue())}}>change</Button>
		</Form>
    </div>
  );
}

test.propTypes = {
	form: PropTypes.object,
	dispatch: PropTypes.func
};

export default connect(({ test }) => ({ test }))(Form.create()(test));
