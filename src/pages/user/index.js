import React, { Component } from 'react';
import axios from '../../network';
import { UserWrapper } from './style';
import Utils from '../../utils/utils';
import ETable from '../../common/ETable';
import UserForm from './components/userForm';
import BaseForm from '../../common/BaseForm';
import { Card, Button, Modal, message } from 'antd';

class User extends Component {

  constructor(props) {
    super(props)

    this.state = {
      formList: [
        {
          type:'INPUT',
          label:'用户名',
          field:'user_name',
          placeholder:'请输入用户名称',
          width:100
        },
        {
          type:'INPUT',
          label:'手机号',
          field:'user_mobile',
          placeholder:'请输入手机号',
          width:100
        },
        {
          type:'DATE',
          label:'请选择入职日期',
          field:'user_date',
          placeholder:'请输入日期',
        }
      ],
      list: [],
      isVisible: false
    }
    this.params = {
      page: 1
    }
  }

  componentDidMount() {
    this.requestList();
  }

  handleFilter = () => {
    this.requestList();
  }

  requestList = async () => {
    const { data } = await axios.getUserList(this.state.params);
    const list = data.result.list.map((item, index) => {
      item.key = index;
      return item
    })
    this.setState({
      list: list
    })
  }

  // 功能区操作
  handleOperate = async (type) => {
      let item = this.state.selectedItem;
      if (type === 'create') {
      this.setState({
        type,
        isVisible: true,
        title: '创建员工'
      })
    } else if (type === 'edit') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一个用户'
        })
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: '编辑员工',
        userInfo: item
      })
    } else if (type === 'detail') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择一位员工'
        })
        return;
      }
      this.setState({
        type,
        isVisible: true,
        title: '员工详情',
        userInfo: item
      })
    } else if (type === 'delete') {
      if (!item) {
        Modal.info({
          title: '提示',
          content: '请选择要删除的员工'
        })
        return;
      }
      let _this = this;
      Modal.confirm({
        title: '确认删除',
        async onOk(){
          await axios.getUserDelete(item.id);
          _this.setState({
            isVisible: false,
          })
          _this.requestList();
        }
      })
    }
  }

  // 创建员工提交
  handleSubmit = async () => {
    let type = this.state.type;
    let info = this.userForm.props.form.getFieldsValue();
    await axios.getUserPush(type, info);

    this.userForm.props.form.resetFields();
    this.setState({
      isVisible: false,
    })
    this.requestList();
  }

  render() {
    const { list, pagination, selectedRowKeys, type, userInfo } = this.state;
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex){
          return sex === 1 ? '男' : '女'
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state){
          return {
            '1': '咸鱼一条',
            '2': '酒神',
            '3': '食神',
            '4': '飞雷神',
            '5': '乞丐'
          }[state]
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest){
          return {
            '1': '吃饭',
            '2': '睡觉',
            '3': '打豆豆',
            '4': '喝酒',
            '5': '乞讨',
            '6': '玩乐',
            '7': '蹦迪',
            '8': '跳舞'
          }[interest]
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday',
      },
      {
        title: '联系地址',
        dataIndex: 'address',
      },
      {
        title: '早起时间',
        dataIndex: 'time',
      }
    ]
    let footer = {};
    if (type === 'detail') {
      footer = {
        footer: null
      }
    }
    
    return (
      <UserWrapper>
        <Card title='员工管理' style={{marginBottom: 10}}>
          <BaseForm formList={this.state.formList} filterSubmit={this.handleFilter}/>
        </Card>
        <Card style={{marginBottom: 10}}>
          <Button type='primary' icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
          <Button type='primary' icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
          <Button type='primary' onClick={() => this.handleOperate('detail')}>员工详情</Button>
          <Button type='primary' icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
        </Card>
        <Card>
          <ETable
            columns={columns}
            dataSource={list}
            pagination={pagination}
            selectedRowKeys={selectedRowKeys}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
          />
        </Card>
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false
            })
          }}
          width={600}
          {...footer}
        >
          <UserForm 
            type={type}
            wrappedComponentRef={(ins) => this.userForm = ins}
            userInfo={userInfo}
          />
        </Modal>
      </UserWrapper>
    )
  }
}

export default User;
