import React, { Component } from 'react';
import { LoginWrapper } from './style.js';
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends Component {

  handleSubmit = () => {
    let userInfo = this.props.form.getFieldsValue();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success(`${userInfo.userName} 成功登录，你的密码为：${userInfo.userPwd}` )
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <LoginWrapper>
        <Card title='登录行内表单' className='card'>
          <Form layout='inline'>
            <FormItem>
              <Input placeholder='请输入用户名'/>
            </FormItem>
            <FormItem>
              <Input placeholder='请输入密码'/>
            </FormItem>
            <FormItem>
              <Button type='primary'>登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title='登录水平表单' className='card'>
          <Form layout='horizontal' style={{width: '300px'}}>
            <FormItem>
              {
                getFieldDecorator('userName', {
                  rules: [
                    {
                      required: true,
                      message: '用户名不能为空'
                    },
                    {
                      min: 5, max: 10,
                      message: '用户名最少不能少于5位'
                    },
                    {
                      pattern: /^\w+$/g,
                      message: '用户名不能携带特殊符号'
                    }
                  ]
                })(
                    <Input prefix={<Icon type='user' />} placeholder='请输入用户名'/>
                )
              }
            </FormItem>

            <FormItem>
            {
                getFieldDecorator('userPwd', {
                  rules: [
                    {
                      required: true,
                      message: '密码不能为空'
                    },
                    {
                      min: 5, max: 10,
                      message: '密码最少不能少于5位'
                    }
                  ]
                })(
                    <Input prefix={<Icon type='lock' />} placeholder='请输入密码'/>
                )
              }
            </FormItem>

            <FormItem>
            {
                getFieldDecorator('checked', {
                  valuePropName: 'checked',
                  initialValue: false
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#" style={{float: 'right'}}>忘记密码</a>
            </FormItem>

            <FormItem>
              <Button type='primary' onClick={this.handleSubmit}>登录</Button>
            </FormItem>
          </Form>
        </Card>
      </LoginWrapper>
    )
  }
  
}

export default Form.create()(Login);
