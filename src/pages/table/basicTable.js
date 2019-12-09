import React, { Component } from 'react';
import { BasicWrapper } from './style';
import { Card, Table, Modal, message, Button } from 'antd';
import axios from '../../network';

class BasicTable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      dataSource2: [],
      selectedRowKeys: null
    }
  }

  componentDidMount() {
    const dataSource = [
      {id: 1, userName: 'Jack', sex: '1', state: '1', interest: '2', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 2, userName: 'Tom', sex: '2', state: '2', interest: '3', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 3, userName: 'Lily', sex: '2', state: '3', interest: '5', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
    ]
    dataSource.map((item, index) => {
      item.key = index
    })
    this.setState({
      dataSource
    });
    this.request();
  }

  // 动态获取mock数据
  request = async () => {
    try {
      let {data} = await axios.getHttpData('/table/list');
      this.setState({
        dataSource2: data.result,
        selectedRowKeys: [],
        selectedRows: null
      })
    } catch (err) {
      console.log(err);
    }
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName}，用户爱好：${record.interest}`
    })
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
  }

  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item) => {
      ids.push(item.id)
    })
    Modal.confirm({
      title: '删除提示！',
      content: `您确定要删除这些数据吗？`,
      onOk: () => {
        message.success('删除成功！');
        this.request();
      }
    })
  }

  render() {
    const columns = [
      {title: 'id', dataIndex: 'id'},
      {title: '用户名', dataIndex: 'userName'},
      {title: '性别', dataIndex: 'sex', render(sex) {
        return sex == 1 ? '男' : '女'
      }},
      {title: '状态', dataIndex: 'state', render(state) {
        let config = {
          '1': '在职',
          '2': '离职',
          '3': '无业游民',
          '4': '乞丐',
          '5': '虚弱'
        }
        return config[state];
      }},
      {title: '爱好', dataIndex: 'interest', render(interest) {
        let config = {
          '1': '吃饭',
          '2': '睡觉',
          '3': '打豆豆',
          '4': '喝酒',
          '5': '蹦迪',
          '6': '上网',
          '7': '跳舞',
          '8': '甩头'
        }
        return config[interest];
      }},
      {title: '生日', dataIndex: 'birthday'},
      {title: '地址', dataIndex: 'address'},
      {title: '早起时间', dataIndex: 'time'},
    ]

    console.log(this.state.selectedRowKeys)
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectedRowKeys
    }

    const rowCheckSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys,
          selectedRows
        })
      }
    }

    return (
      <BasicWrapper>
        <Card title='基础表格' className='card'>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
          />
        </Card>

        <Card title='动态数据渲染表格' className='card'>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
          />
        </Card>

        <Card title='Mock-单选' className='card'>
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                  onClick: () => {this.onRowClick(record, index)}
              }
            }}
          />
        </Card>

        <Card title='Mock-复选' className='card'>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            rowSelection={rowCheckSelection}
          />
          <div style={{marginBottom: '10px'}}>
            <Button type='danger' onClick={this.handleDelete}>删除</Button>
          </div>
        </Card>
      </BasicWrapper>
    )
  }
}

export default BasicTable;
