import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Radio, Modal } from 'antd';

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
      Object.assign(data, getFieldsValue(), item, { reply: getFieldsValue().reply, replyTime: parseInt(new Date().getTime() / 1000) });
      onOk(data);
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
      <FormItem label="用户" hasFeedback {...formItemLayout}>
          {getFieldDecorator('commentUser', {
            initialValue: item.commentUser,
            
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem label="内容" hasFeedback {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: item.content,
            
          })(<Input.TextArea autosize={true} disabled={true} />)}
        </FormItem>
        <FormItem label="评论时间" hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('commentTime', {
              initialValue: new Date(parseInt(item.commentTime) * 1000).toLocaleString(),
              
            })(<Input disabled={true} />)
          }
        </FormItem>
        <FormItem label="回复" hasFeedback {...formItemLayout}>
          {
            getFieldDecorator('reply', {
              initialValue: item.reply,
              rules: [
                {
                  required: false
                },
              ],
            })(<Input.TextArea autosize={true} />)
          }
        </FormItem>
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
