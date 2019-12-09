import React, { Component } from 'react';
import { OrderWrapper } from './style';
import BaseForm from '../../common/BaseForm';
import ETable from '../../common/ETable';
import { Card, Button, Modal, Form, message } from 'antd';
import axios from '../../network';
import Utils from '../../utils/utils';

class Order extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [],
      orderInfo: {},
      orderConfirm: false,
      selectedRowKeys: [],
      dataSource: [],
      formList: [
        {
            type:'SELECT',
            label:'城市',
            field:'city',
            placeholder:'全部',
            initialValue:'1',
            width:80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '深圳' }, { id: '3', name: '上海' }]
        },
        {
            type: '时间查询'
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field:'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        }
      ]
    }
    this.params = {
      page: 1
    }
  }
  
  componentDidMount() {
    this.requestList();
  }

  // 请求数据
  requestList = async () => {
    const _this = this;
    const { data } = await axios.getOrderList(this.params);
    const list = data.result.item_list.map((item, index) => {
      item.key = index;
      return item;
    });

    this.setState({
      list,
      pagination: Utils.pagination(data.result, (current) => {
        _this.params.page = current;
        console.log(_this.params.page)
        _this.requestList();
      })
    });
  }

  //获取表单信息 
  handleFilter = (params) => {
    this.params = params;
    console.log(this.params)
    this.requestList();
  }

  // 订单确认
  handleConfirm = async () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束!'
      });
      return;
    } 
    const { data } = await axios.getOrderConfirm(item.id);
    console.log(data)
    this.setState({
      orderConfirm: true,
      orderInfo: data.result
    })
  }

  // 结束订单
  handleFinishOrder = async () => {
    let item = this.state.selectedItem;
    console.log(item.id)
    const { data } = await axios.getFinishOrder(item.id);
    console.log(data)
    message.success('订单结束成功');
    this.setState({
      orderConfirm: false,
    })
    this.requestList();
  }

  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单'
      });
      return
    }
    
    window.open(`/common/order/detail/${item.id}`, '_blank')
  }

  render() {
    const columns = [
      {
        title: '订单编号',
        dataIndex: 'order_sn'
      },
      {
        title: '车辆编号',
        dataIndex: 'bike_sn'
      },
      {
        title: '用户名',
        dataIndex: 'user_name'
      },
      {
        title: '手机号码',
        dataIndex: 'mobile'
      },
      {
        title: '里程',
        dataIndex: 'distance',
        render(distance){
          return distance / 1000 + 'km';
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
      },
      {
        title: '状态',
        dataIndex: 'status'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '订单金额',
        dataIndex: 'total_fee'
      },
      {
        title: '实付金额',
        dataIndex: 'user_pay'
      }
    ];
    const FormItem = Form.Item;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }
    const { list, pagination, selectedRowKeys } = this.state;
    return (
      <OrderWrapper>
        <Card title='订单管理'>
          <BaseForm formList={this.state.formList} filterSubmit={this.handleFilter} />
        </Card>
        <Card style={{marginTop: 10}}>
          <Button type='primary' style={{marginRight: 10}} onClick={this.openOrderDetail}>订单详情</Button>
          <Button type='primary' onClick={this.handleConfirm}>结束订单</Button>
        </Card>
        <div className='content-wrap'>
          <ETable
            columns={columns}
            dataSource={list}
            pagination={pagination}
            selectedRowKeys={selectedRowKeys}
            // rowSelection = 'checkbox'
            selectedIds={this.state.selectedIds}
            selectedItem={this.state.selectedItem}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
          />
          {/* <Table
            style={{background:'#fff'}}
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: () => {this.onRowClick(record, index)}
              }
            }}
          /> */}
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirm}
          onCancel={() => {
            this.setState({
              orderConfirm: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout='horizontal'>
            <FormItem label='车辆编号' {...formItemLayout}>
              { this.state.orderInfo.bike_sn }
            </FormItem>
            <FormItem label='剩余电量' {...formItemLayout}>
              { this.state.orderInfo.battery + '%' }
            </FormItem>
            <FormItem label='行程开始时间' {...formItemLayout}>
              { this.state.orderInfo.start_time }
            </FormItem>
            <FormItem label='当前位置' {...formItemLayout}>
              { this.state.orderInfo.location }
            </FormItem>
          </Form>
        </Modal>
      </OrderWrapper>
    )
  }
}

export default Order;
