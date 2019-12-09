import React, { Component } from 'react';
import { LineWrapper } from './style';
import { Card } from 'antd';
import echarts from 'echarts/lib/echarts';
import ReactECharts from 'echarts-for-react';
import themeLight from './themeLight';

import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/chart/line';

class Line extends Component {

  componentDidMount(){
    echarts.registerTheme("superK", themeLight)
  }

  getOption = () => {
    let option = {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [
            1000,
            2000,
            1500,
            3000,
            2000,
            1200,
            800
          ]
        }
      ]
    }

    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        type: 'plain'
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
      },
      series: [
        {
          name: 'OFO订单量',
          type: 'line',
          data: [
            1200,
            3000,
            4500,
            6000,
            8000,
            12000,
            20000
          ]
        },
        {
          name: '摩拜订单量',
          type: 'line',
          data: [
            1000,
            2000,
            5500,
            6000,
            8000,
            10200,
            12000
          ]
        }
      ]
    }

    return option;
  }

  getOption3 = () => {
    let option = {
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      yAxis: {
        type: 'value'
      },
      xAxis: {
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日',]
      },
      series: [
        {
          name: '订单量',
          type: 'line',
          areaStyle: {},
          data: [
            1000,
            2000,
            1500,
            3000,
            2000,
            1200,
            800
          ]
        }
      ]
    }

    return option;
  }

  render(){
    return(
      <LineWrapper>
        <Card title="折线图一" style={{marginBottom: 10}}>
          <ReactECharts option={this.getOption()} theme="superK" style={{height: 400}} />
        </Card>
        <Card title="折线图二" style={{marginBottom: 10}}>
          <ReactECharts option={this.getOption2()} theme="superK" style={{height: 400}} />
        </Card>
        <Card title="折线图三" style={{marginBottom: 10}}>
          <ReactECharts option={this.getOption3()} theme="superK" style={{height: 400}} />
        </Card>
      </LineWrapper>
    )
  }
}

export default Line;
