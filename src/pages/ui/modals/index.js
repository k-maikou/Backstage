import React, { Component } from 'react';
import { ModalsWrapper } from '../style';
import { Card, Button, Modal } from 'antd';

class Modals extends Component{

  constructor(props) {
    super(props)

    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false
    }
    
  }

  handleOpen = (type) => {
    this.setState({
      // 动态控制对应触发对应事件触发对应的传进来的type
      [type]: true
    })
  }

  handleConfirm = (type) => {
    Modal[type]({
      title: '确认',
      content: '你确定要进入新世界了吗',
      onOk(){
        console.log('ok')
      },
      onCancel(){
        console.log('cancel')
      }
    })
  }

  render() {
    return (
      <ModalsWrapper>
        <Card title='基础模态框' className='card'>
          <Button type='primary' onClick={ () => this.handleOpen('showModal1') }>Open</Button>
          <Button type='primary' onClick={ () => this.handleOpen('showModal2') }>自定义页脚</Button>
          <Button type='primary' onClick={ () => this.handleOpen('showModal3') }>顶部20px弹框</Button>
          <Button type='primary' onClick={ () => this.handleOpen('showModal4') }>水平垂直居中</Button>
        </Card>
        <Card title='信息确认框' className='card'>
          <Button type='primary' onClick={ () => this.handleConfirm('confirm') }>Confirm</Button>
          <Button type='primary' onClick={ () => this.handleConfirm('info') }>Info</Button>
          <Button type='primary' onClick={ () => this.handleConfirm('success') }>Success</Button>
          <Button type='primary' onClick={ () => this.handleConfirm('warning') }>Warning</Button>
        </Card>
        <Modal
          title='React'
          visible={this.state.showModal1}
          onCancel={() => {this.setState({showModal1: false})}}
        >
          <p>欢迎来到权利的游戏</p>
        </Modal>
        <Modal
          title='React'
          visible={this.state.showModal2}
          cancelText='没事'
          okText='好的'
          onOk={() => {this.setState({showModal2: false})}}
        >
          <p>欢迎来到权利的游戏</p>
        </Modal>
        <Modal
          title='React'
          style={{top:20}}
          visible={this.state.showModal3}
          cancelText='没事'
          okText='好的'
          onOk={() => {this.setState({showModal3: false})}}
        >
          <p>欢迎来到权利的游戏</p>
        </Modal>
        <Modal
          title='React'
          visible={this.state.showModal4}
          cancelText='没事'
          okText='好的'
          wrapClassName='modal'
          onCancel={() => {this.setState({showModal4: false})}}
          onOk={() => {this.setState({showModal4: false})}}
        >
          <p>欢迎来到权利的游戏</p>
        </Modal>
      </ModalsWrapper>
    )
  }
}

export default Modals;
