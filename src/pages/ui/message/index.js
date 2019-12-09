import React, { Component } from 'react';
import { MessageWrapper } from '../style';
import { Card, Button, message } from 'antd';

class Message extends Component {

  handleClick = (type) => {

    if (type) {
      message.config({
        duration: 3
      })
    }
    message[type]({
      content: '获取请求' + ':' + type
    })
  }

  render() {
    return (
      <MessageWrapper>
        <Card title='全局消息提示'>
          <Button type='primary' onClick={() => this.handleClick('success')}>success</Button>
          <Button type='primary' onClick={() => this.handleClick('error')}>error</Button>
          <Button type='primary' onClick={() => this.handleClick('info')}>info</Button>
          <Button type='primary' onClick={() => this.handleClick('warning')}>warning</Button>
          <Button type='primary' onClick={() => this.handleClick('loading')}>loading</Button>
        </Card>
      </MessageWrapper>
    )
  }
}

export default Message;
