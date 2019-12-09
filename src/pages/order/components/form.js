import React, { Component } from 'react';
import { Form, Select, Button, DatePicker } from 'antd';

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

        <FormItem label='订单时间'>
          {
            getFieldDecorator('start_time')(
              <DatePicker showTime format="YYY-MMM-DD HH:mm:ss" />

            )
          }
        </FormItem>

        <FormItem>
          {
            getFieldDecorator('end_time')(
              <DatePicker showTime format="YYY-MMM-DD HH:mm:ss" />

            )
          }
        </FormItem>

        <FormItem label='订单状态'>
          {
            getFieldDecorator('order_status')(
              <Select
                style={{width: 80}}
                placeholder='全部'
              >
                <Option value=''>全部</Option>
                <Option value='1'>进行中</Option>
                <Option value='2'>结束行程</Option>
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
