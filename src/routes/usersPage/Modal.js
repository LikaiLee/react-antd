import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd';
import city from '../../utils/city';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  // console.log(item);
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = {};
      Object.assign(data, item, getFieldsValue(), { addtime: parseInt(new Date().getTime() / 1000) });
      onOk(data);
      /*const data = {
        item,
        ...getFieldsValue(),
      }*/
      // data.address = data.address.join(' ')
      // onOk(data);
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
      <FormItem label="手机号" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: '输入的不是有效手机号!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="昵称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('roleName', {
            initialValue: item.roleName,
            rules: [
              {
                required: false,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('password', {
              initialValue: item.password,
              rules: [
                {
                  required: true,
                  message: '密码不能为空！',
                },
              ],
            })(<Input />)
          }
        </FormItem>
        <FormItem label="年龄" hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', {
            initialValue: item.age,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={18} max={100} />)}
        </FormItem>

        {/*<FormItem label="NickName" hasFeedback {...formItemLayout}>
          {getFieldDecorator('nickName', {
            initialValue: item.nickName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Gender" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: item.isMale,
            rules: [
              {
                required: true,
                type: 'boolean',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          )}
        </FormItem>
        
        <FormItem label="E-mail" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Address" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address && item.address.split(' '),
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            size="large"
            style={{ width: '100%' }}
            options={city}
            placeholder="Pick an address"
          />)}
        </FormItem>*/}
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
