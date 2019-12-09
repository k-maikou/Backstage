import React, { Component } from 'react';
import { NotWrapper } from '../style';
import { Card, Button, notification, Icon } from 'antd';

class Router extends Component {

  openNotification = (type, position) => {
    if (position) {
      notification.config({
        placement: position
      })
    }

    notification[type] ({
      message: '鬼子进村啦，杀鬼子去咯！',
      description: '冲冲冲!',
    })
  }

  render() {
    return (
      <NotWrapper>
        <Card title='通知提醒框' className='card'>
          <Button type='primary' onClick={() => this.openNotification('success')}>Open Success</Button>
          <Button type='primary' onClick={() => this.openNotification('info')}>Open Info</Button>
          <Button type='primary' onClick={() => this.openNotification('warning')}>Open Warning</Button>
          <Button type='primary' onClick={() => this.openNotification('error')}>Open Error</Button>
          <Button type='primary' onClick={() => this.openNotification('open')}>Open Open</Button>
        </Card>
        <Card title='通知提醒框位置' className='card'>
          <Button type='primary' onClick={() => this.openNotification('success', 'topLeft')}>
            <Icon type="radius-upleft" />Open Success
          </Button>
          <Button type='primary' onClick={() => this.openNotification('info', 'topRight')}>
            <Icon type="radius-upright" />Open Info
          </Button>
          <Button type='primary' onClick={() => this.openNotification('warning', 'bottomLeft')}>
            <Icon type="radius-bottomleft" />Open Warning
          </Button>
          <Button type='primary' onClick={() => this.openNotification('error', 'bottomRight')}>
            <Icon type="radius-bottomright" />Open Error
          </Button>
          <Button type='primary' onClick={() => this.openNotification('open')}>Open Open</Button>
        </Card>
      </NotWrapper>
    )
  }
}

export default Router;
