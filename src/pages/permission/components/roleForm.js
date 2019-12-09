import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class RoleForm extends Component {
  render() {
    const type = this.props.type;
    const roleInfo = this.props.roleInfo || {};
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 10}
    }
    return(
      <Form layout='horizontal'>
        <FormItem label='角色名称' {...formItemLayout }>
          {
            getFieldDecorator('role_name')(
              <Input placeholder='请输入角色名称' type='text' />
            )
          }
        </FormItem>
        <FormItem label='状态' {...formItemLayout }>
          {
            getFieldDecorator('status', {
              initialValue: '请选择状态'
            })(
              <Select>
                <Option value='1'>启用</Option>
                <Option value='2'>停用</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}

RoleForm = Form.create({})(RoleForm);

export default RoleForm;
