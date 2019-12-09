import React, { Component } from 'react';
import { BarWrapper } from './style';
import { Card } from 'antd';
import echartTheme from './echartTheme';
import ReactEChart from 'echarts-for-react';
// 按需导入
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class Bar extends Component {

  constructor(props) {
    super(props)
  }

  componentWillMount(){
    echarts.registerTheme('SuperK', echartTheme);
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '订单量',
          type: 'bar',
          data: [1000, 2000, 1320, 2200, 1300, 2410, 2800]
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      legend: {
        data: ['OFO', '摩拜', '小蓝']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO',
          type: 'bar',
          data: [1000, 2000, 3120, 3800, 6200, 7310, 10200]
        },
        {
          name: '摩拜',
          type: 'bar',
          data: [800, 1700, 2420, 4800, 7300, 9510, 12100]
        },
        {
          name: '小蓝',
          type: 'bar',
          data: [1000, 1900, 3320, 3600, 4100, 5110, 5600]
        }
      ]
    }
    return option;
  }

  render(){
    return(
      <BarWrapper>
        <Card title='柱形图表一' style={{marginBottom: 10}}>
          <ReactEChart option={this.getOption()} theme="SuperK" style={{height: 500}}/>
        </Card>
        <Card title='柱形图表二'>
          <ReactEChart option={this.getOption2()} theme="SuperK" style={{height: 500}}/>
        </Card>
      </BarWrapper>
    )
  }
}

export default Bar;
