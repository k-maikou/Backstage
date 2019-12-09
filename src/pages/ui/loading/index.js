import React, { Component } from 'react';
import { LoadingWrapper } from '../style';
import { Card, Spin, Icon, Alert, Switch } from 'antd';

class Loading extends Component{

  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  handleLoading = () => {
    this.setState((preState) => ({
      loading: !preState.loading
    }))
  }

  render() {
    const icon = <Icon type="loading" style={{ fontSize: 24 }} spin />
    return (
      <LoadingWrapper>
        <Card title='Spin用法' className='card'>
          <Spin size='small' />
          <Spin size='default' />
          <Spin size='large' />
          <Spin indicator={icon} />
        </Card>
        <Card title='遮挡层' className='card'>
          <Alert 
            style={{marginBottom: '10px'}}
            message='看到什么喝什么'
            description='今日你饮咗没'
            type='info'
          />
          <Spin>
            <Alert 
              message='看到什么喝什么'
              description='今日你饮咗没'
              type='info'
            />
          </Spin>
          <Spin tip='加载中...'>
            <Alert 
              message='看到什么喝什么'
              description='今日你饮咗没'
              type='info'
            />
          </Spin>
          <Spin tip='加载中...' indicator={icon} spinning={ this.state.loading }>
            <Alert 
              message='看到什么喝什么'
              description='今日你饮咗没'
              type='info'
            />
          </Spin>
          <Switch onChange={ this.handleLoading } checked={this.state.loading} />
        </Card>
      </LoadingWrapper>
    )
  }
}

export default Loading;
