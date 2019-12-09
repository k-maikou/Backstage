import React, { Component } from 'react';
import { PerMissionWrapper } from './style';
import ETable from '../../common/ETable';
import RoleForm from './components/roleForm';
import PermissionForm from './components/permissionForm';
import RoleAuthForm from './components/roleUserForm';
import Utils from '../../utils/utils';
import axios from '../../network';
import { Card, Button, Modal } from 'antd';

class PerMission extends Component {

  constructor(props){
    super(props)

    this.state = {
      list: [],
      selectedRowKeys: [],
      isRoleVisible: false,
      isPermVisible: false,
      isAuthVisible: false,
      menuInfo: [],
      detailInfo: {},
      mockData: [],
      targetKeys: []
    }
    this.params = {}
  }

  componentDidMount() {
    this.requestList(this.params);
  }

  requestList = async (params) => {
    const { data } = await axios.getPermissionData(params);
    const list = data.result.item_list.map((item, index) => {
      item.key = index;
      return item
    });
    this.setState({
      list
    });
  }

  //角色提交
  handleSubmit = async () => {
    let info = this.roleForm.props.form.getFieldsValue();
    console.log(info)
    await axios.getRolePush(info);
    this.roleForm.props.form.resetFields();
    this.setState({
      visible: false
    })
    this.requestList();
  }

  // 创建角色
  handleRoleUser = () => {
      this.setState({
        isRoleVisible: true
      })
  }

  // 设置权限
  handlePermission = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '提示',
        content: '请选择一个角色'
      })
      return;
    }
    
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item.menus
    })
    console.log(item)
  }

  // 设置权限提交
  handlePermEditSubmit = async () => {
    let permFormInfo = this.permForm.props.form.getFieldsValue();
    permFormInfo.role_id = this.state.selectedItem.id;
    permFormInfo.menus = this.state.menuInfo;
    await axios.getRolePerm(permFormInfo);
    this.setState({
      isPermVisible: false
    });
    this.requestList();
    console.log(permFormInfo);
  }

  // 用户授权
  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '提示',
        content: '请选择一位角色'
      })
      return;
    }
    this.setState({
      isAuthVisible: true,
      detailInfo: item
    })

    this.getRoleUserList(item.id);
  }

  // 获取用户授权信息
  getRoleUserList = async (id) => {
    let { data } = await axios.getRoleUserList(id);
    this.getAuthUserList(data.result);
  }

  // 筛选用户授权信息
  getAuthUserList = (dataSource) => {
    const mockData = [];
    const targetKeys = [];
    let data = {};
    if (dataSource && dataSource.length > 0) {
      dataSource.map((item) => {
        data = {
          key: item.user_id,
          title: item.user_name,
          status: item.status
        }
        if (item.status === 1) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      })
      this.setState({
        mockData,
        targetKeys
      })
    }
    console.log(data)
  }

  // 用户授权提交
  handleUserSubmit = async () => {
    try {
      let data = {};
      data.user_id = this.state.targetKeys;
      data.role_id = this.state.selectedItem.id;
      await axios.getRoleUserEdit(data);
      console.log(data);
      this.setState({
        isAuthVisible: false
      })
      this.requestList();
    } catch (error) {
      throw error;
    }
  }

  render(){
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render(create_time) {
          return Utils.formateDate(create_time);
        }
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          return status === 0 ? '启用' : '停用'
        }
      },
      {
        title: '授权日期',
        dataIndex: 'authorize_time',
        render: Utils.formateDate
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ];

    const { 
      list,
      isRoleVisible,
      isPermVisible,
      isAuthVisible,
      selectedRowKeys,
      detailInfo,
      menuInfo,
      mockData,
      targetKeys
    } = this.state;

    return(
      <PerMissionWrapper>
        <Card style={{marginBottom: 10}}>
          <Button type='primary' onClick={this.handleRoleUser}>创建角色</Button>
          <Button type='primary' onClick={this.handlePermission}>设置权限</Button>
          <Button type='primary' onClick={this.handleUserAuth}>用户授权</Button>
        </Card>

        <Card>
          <ETable
            columns={columns}
            dataSource={list}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={selectedRowKeys}
          />
        </Card>

        <Modal 
          visible={isRoleVisible}
          title='创建角色'
          onCancel={() => {
            this.roleForm.props.form.resetFields();
            this.setState({
              isRoleVisible: false
            })
          }}
          onOk={this.handleSubmit}
        >
          <RoleForm 
            wrappedComponentRef={(ins) => this.roleForm = ins}
          />
        </Modal>

        <Modal
          title='设置权限'
          visible={isPermVisible}
          width={600}
          onOk={this.handlePermEditSubmit}
          onCancel={() => {
            this.setState({
              isPermVisible: false
            })
          }}
        >
          <PermissionForm 
            detailInfo={detailInfo}
            menuInfo={menuInfo}
            patchMenuInfo={(keys) => {
              this.setState({
                menuInfo: keys
              })
            }}
            wrappedComponentRef={(ins) => this.permForm = ins}
          />
        </Modal>

        <Modal
          visible={isAuthVisible}
          title='用户授权'
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isAuthVisible: false
            })
          }}
        >
          <RoleAuthForm 
            detailInfo={detailInfo}
            targetKeys={targetKeys}
            mockData={mockData}
            wrappedComponentRef={(ins) => this.userAuthForm = ins}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys
              })
            }}
          />
        </Modal>

      </PerMissionWrapper>
    )
  }
}

export default PerMission;
