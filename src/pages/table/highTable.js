import React, { Component } from 'react';
import { HighWrapper } from './style';
import { Card, Table, Badge, Modal, message, Button } from 'antd';
import axios from '../../network';

class HighTable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dataSource: [],
      dataSource2: []
    }
  }

  componentDidMount() {
    const dataSource = [
      {id: 1, userName: 'Jack', sex: '1', age: '18', state: '1', interest: '2', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 2, userName: 'Tom', sex: '2', age: '22', state: '2', interest: '3', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 3, userName: 'Lily', sex: '2', age: '33', state: '3', interest: '5', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 4, userName: 'Lily', sex: '2', age: '65', state: '4', interest: '2', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 5, userName: 'Lily', sex: '2', age: '12', state: '3', interest: '1', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 6, userName: 'Lily', sex: '2', age: '17', state: '5', interest: '6', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 7, userName: 'Lily', sex: '2', age: '8', state: '1', interest: '7', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 8, userName: 'Lily', sex: '2', age: '45', state: '5', interest: '4', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 9, userName: 'Lily', sex: '2', age: '32', state: '2', interest: '8', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
      {id: 10, userName: 'Lily', sex: '2', age: '24', state: '3', interest: '1', birthday: '2000-01-01', address: '深圳市罗湖区东湖公园', time: '09:00'},
    ];
    dataSource.map((item, index) => {
      item.key = index
    })
    this.setState({
      dataSource
    });
    this.request()
  }

  handleChange = (pagination, filters, sorter) => {
    console.log(sorter)
    this.setState({
      sortOrder: sorter.order
    })
  }

  // 动态获取mock数据
  request = async () => {
    try {
      let {data} = await axios.getHttpData('/table/high/list');
      this.setState({
        dataSource2: data.result,
      })
    } catch (err) {
      console.log(err);
    }
  }

  // 删除操作
  handleDelete = (item) => {
    let id = item.id;
    Modal.confirm({
      title: '确认',
      content: '您确认要删除此条数据吗？',
      onOk: () => {
        message.success('删除成功');
        this.request()
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

    const columns2 = [
      {title: 'id', dataIndex: 'id', fixed: 'left'},
      {title: '用户名', dataIndex: 'userName', fixed: 'left'},
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
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '生日', dataIndex: 'birthday'},
      {title: '地址', dataIndex: 'address', fixed: 'right'},
      {title: '早起时间', dataIndex: 'time', fixed: 'right'},
    ]

    const columns3 = [
      {title: 'id', dataIndex: 'id'},
      {title: '用户名', dataIndex: 'userName'},
      {title: '性别', dataIndex: 'sex', render(sex) {
        return sex == 1 ? '男' : '女'
      }},
      {title: '年龄', dataIndex: 'age', sorter: (a, b) => {
        return a.age - b.age;
      }, sortOrder: this.state.sortOrder
      },
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

    const columns4 = [
      {title: 'id', dataIndex: 'id'},
      {title: '用户名', dataIndex: 'userName'},
      {title: '性别', dataIndex: 'sex', render(sex) {
        return sex == 1 ? '男' : '女'
      }},
      {title: '年龄', dataIndex: 'age'},
      {title: '状态', dataIndex: 'state', render(state) {
        let config = {
          '1': <Badge status='success' text='成功' />,
          '2': <Badge status='error' text='报错' />,
          '3': <Badge status='default' text='正常' />,
          '4': <Badge status='processing' text='进行中' />,
          '5': <Badge status='warning' text='警告' />
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
      {title: '操作', render: (text, index) => {
        return (
          <Button size='small' type='danger' onClick={() => { this.handleDelete(text, index) }} >删除</Button>
        )
      }},
    ]

    return (
      <HighWrapper>
        <Card title='表单头部固定' className='card'>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            scroll={{y: 300}}
          />
        </Card>

        <Card title='表单侧列固定' className='card'>
          <Table
            columns={columns2}
            dataSource={this.state.dataSource}
            scroll={{x: 2000}}
          />
        </Card>

        <Card title='表格排序' className='card'>
          <Table
            columns={columns3}
            dataSource={this.state.dataSource}
            onChange={this.handleChange}
          />
        </Card>

        <Card title='操作按钮' className='card'>
          <Table
            columns={columns4}
            dataSource={this.state.dataSource}
          />
        </Card>
      </HighWrapper>
    )
  }
}

export default HighTable;
