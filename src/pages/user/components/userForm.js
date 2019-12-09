import React, {Component} from 'react';
import moment from 'moment';
import { Form, Input, Radio, DatePicker, Select } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

class UserForm extends Component {

  getState = (state) => {
    return {
      '1': '咸鱼一条',
      '2': '酒神',
      '3': '食神',
      '4': '飞雷神',
      '5': '乞丐'
    }[state]
  }

  render() {
    const type = this.props.type;
    const userInfo = this.props.userInfo || {};
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 10}
    }
    return (
      <Form layout='horizontal'>
        <FormItem label='用户名' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.username : 
            getFieldDecorator('user_name', {
              initialValue: userInfo.username
            })(
              <Input type='text' placeholder='请输入用户名' />
            )
          }
        </FormItem>
        <FormItem label='性别' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.sex === 1 ? '男' : '女' : 
            getFieldDecorator('sex', {
              initialValue: userInfo.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label='状态' {...formItemLayout}>
          {
            type === 'detail' ? this.getState(userInfo.state) : 
            getFieldDecorator('state', {
              initialValue: userInfo.state
            })(
              <Select>
                <Option value='1'>咸鱼一条</Option>
                <Option value='2'>酒神</Option>
                <Option value='3'>食神</Option>
                <Option value='4'>飞雷神</Option>
                <Option value='5'>乞丐</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label='生日' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.birthday : 
            getFieldDecorator('birthday', {
              initialValue: moment(userInfo.birthday)
            })(
              <DatePicker />
            )
          }
        </FormItem>
        <FormItem label='联系地址' {...formItemLayout}>
          {
            type === 'detail' ? userInfo.address : 
            getFieldDecorator('address', {
              initialValue: userInfo.address
            })(
              <TextArea rows={3} placeholder='请输入联系地址' />
            )
          }
        </FormItem>
      </Form>
    )
  }
}
UserForm = Form.create({})(UserForm);

export default UserForm;
