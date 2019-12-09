import React, { Component } from 'react';
import { RegWrapper } from './style.js';
import { Card, Form, Input, Button, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, Icon, message, InputNumber, Rate } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Reg extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userImg: null
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          userImg: imageUrl,
          loading: false,
        }),
      );
    }
  }

  handleSubmit = () => {
    let data = this.props.form.getFieldsValue();
    console.log(data);
    message.success({
      content: '注册成功~'
    })
  }

  render() {
    const { Option } = Select;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 10
      }
    }
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12, offset: 4
        }
      }
    }
    return (
      <RegWrapper>
        <Card title='表单注册'>
          <Form>

            <FormItem label='用户名' {...formItemLayout}>
              {
                getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    }
                  ]
                })(
                  <Input placeholder='请输入用户名' />
                )
              }
            </FormItem>

            <FormItem label='密码' {...formItemLayout}>
              {
                getFieldDecorator('userPwd', {
                  initialValue: ''
                })(
                  <Input placeholder='请输入密码' />
                )
              }
            </FormItem>

            <FormItem label='性别' {...formItemLayout}>
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(
                  <Radio.Group>
                    <Radio value='1'>男</Radio>
                    <Radio value='2'>女</Radio>
                  </Radio.Group>
                )
              }
            </FormItem>

            <FormItem label='年龄' {...formItemLayout}>
              {
                getFieldDecorator('age', {
                  initialValue: '18'
                })(
                  <InputNumber />
                )
              }
            </FormItem>

            <FormItem label='状态' {...formItemLayout}>
              {
                getFieldDecorator('state', {
                  initialValue: '1'
                })(
                  <Select mode=''>
                    <Option value='1'>在职</Option>
                    <Option value='2'>离职</Option>
                    <Option value='3'>无业游民</Option>
                  </Select>
                )
              }
            </FormItem>
            
            <FormItem label='爱好' {...formItemLayout}>
              {
                getFieldDecorator('like', {
                  initialValue: ['2', '4']
                })(
                  <Select mode='multiple'>
                    <Option value='1'>吃饭</Option>
                    <Option value='2'>睡觉</Option>
                    <Option value='3'>打豆豆</Option>
                    <Option value='4'>喝酒</Option>
                    <Option value='5'>蹦迪</Option>
                    <Option value='6'>上网</Option>
                  </Select>
                )
              }
            </FormItem>

            <FormItem label='是否已婚' {...formItemLayout}>
              {
                getFieldDecorator('isMarried', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Switch />
                )
              }
            </FormItem>

            <FormItem label='生日' {...formItemLayout}>
              {
                getFieldDecorator('birthday', {
                  initialValue: moment('2018-08-08')
                })(
                  <DatePicker></DatePicker>
                )
              }
            </FormItem>

            <FormItem label='联系地址' {...formItemLayout}>
              {
                getFieldDecorator('address', {
                  initialValue: '深圳市罗湖区东湖公园'
                })(
                  <Input.TextArea 
                    autoSize={ {minRows: 4, maxRows: 6} }
                  />
                )
              }
            </FormItem>

            <FormItem label='早起时间' {...formItemLayout}>
              {
                getFieldDecorator('time')(
                  <TimePicker 

                  />
                )
              }
            </FormItem>

            <FormItem label='头像' {...formItemLayout}>
              {
                getFieldDecorator('userImg')(
                  <Upload
                    listType='picture-card'
                    showUploadList={false}
                    action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                    onChange={this.handleChange}
                  >
                    {this.state.userImg ? <img width={100} src={this.state.userImg} /> : <Icon type='plus' />}
                  </Upload>
                )
              }
            </FormItem>

            <Form.Item label="评价" {...formItemLayout}>
              {getFieldDecorator('rate', {
                initialValue: 3.5,
              })(<Rate allowHalf/>)}
            </Form.Item>


            <FormItem {...offsetLayout}>
              {
                getFieldDecorator('checkbox')(
                  <Checkbox>我已阅读该<a href="#">协议</a></Checkbox>
                )
              }
            </FormItem>

            <FormItem {...offsetLayout}>
              <Button type='primary' onClick={this.handleSubmit}>注册</Button>
            </FormItem>

          </Form>
        </Card>
      </RegWrapper>
    )
  }
}

export default Form.create()(Reg);
