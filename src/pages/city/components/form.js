import React, { Component } from 'react';
import { Form, Select, Button } from 'antd';

class CityForm extends Component {
  render() {
    const FormItem = Form.Item;
    const Option = Select.Option;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout='inline'>
        <FormItem label='城市'>
          {
            getFieldDecorator('city_id')(
              <Select
                style={{width: 80}}
                placeholder='全部'
              >
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>上海市</Option>
                <Option value='3'>广州市</Option>
                <Option value='4'>深圳市</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label='用车模式'>
          {
            getFieldDecorator('mode')(
              <Select
                style={{width: 130}}
                placeholder='全部'
              >
                <Option value=''>全部</Option>
                <Option value='1'>指定停车点模式</Option>
                <Option value='2'>禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label='营运模式'>
          {
            getFieldDecorator('op_mode')(
              <Select
                style={{width: 80}}
                placeholder='全部'
              >
                <Option value=''>全部</Option>
                <Option value='1'>自营</Option>
                <Option value='2'>加盟</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem label='加盟商授权状态'>
          {
            getFieldDecorator('auth_status')(
              <Select
                style={{width: 80}}
                placeholder='全部'
              >
                <Option value=''>全部</Option>
                <Option value='1'>已授权</Option>
                <Option value='2'>未授权</Option>
              </Select>
            )
          }
        </FormItem>

        <FormItem>
          <Button type='primary' style={{margin: '0 20px'}}>查询</Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    )
  }
}

CityForm = Form.create({})(CityForm);

export default CityForm;
