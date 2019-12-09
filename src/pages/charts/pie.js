import React, { Component } from 'react';
import { PieWrapper } from './style';
import { Card } from 'antd';
import themeLight from './themeLight';
import ReactEChart from 'echarts-for-react';
// 按需导入
import echarts from 'echarts/lib/echarts';
// 导入柱形图
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

class Pie extends Component {

  componentWillMount(){
    echarts.registerTheme('SuperK', themeLight);
  }

  getOption = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b}:{c}({d}%)'
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 3000,
              name: '周三'
            },
            {
              value: 4000,
              name: '周四'
            },
            {
              value: 5000,
              name: '周五'
            },
            {
              value: 6000,
              name: '周六'
            },
            {
              value: 7000,
              name: '周日'
            }
          ]
        }
      ]
    }

    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行记录',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b} : {c}({d}%)'
      },
      legend: {
        type: 'plain',
        orient: 'vertical',
        right: 10,
        bottom: 20,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          radius: ['50%', '80%'],
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 1300,
              name: '周三'
            },
            {
              value: 2500,
              name: '周四'
            },
            {
              value: 3100,
              name: '周五'
            },
            {
              value: 2000,
              name: '周六'
            },
            {
              value: 1586,
              name: '周日'
            }
          ]
        }
      ]
    }

    return option;
  }

  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行记录',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a}<br/>{b} : {c}({d}%)'
      },
      legend: {
        type: 'plain',
        orient: 'vertical',
        right: 10,
        bottom: 20,
        top: 20,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: [
            {
              value: 1000,
              name: '周一'
            },
            {
              value: 2000,
              name: '周二'
            },
            {
              value: 1300,
              name: '周三'
            },
            {
              value: 2500,
              name: '周四'
            },
            {
              value: 3100,
              name: '周五'
            },
            {
              value: 2000,
              name: '周六'
            },
            {
              value: 1586,
              name: '周日'
            }
          ].sort((a, b) => {
            return a.value - b.value;
          }),
          roseType: 'radius'
        }
      ]
    }

    return option;
  }

  render(){
    return(
      <PieWrapper>
        <Card title='饼形图表一' style={{marginBottom: 10}}>
          <ReactEChart option={this.getOption()} theme="SuperK" style={{height: 500}}/>
        </Card>
        <Card title='饼形图表二'>
          <ReactEChart option={this.getOption2()} theme="SuperK" style={{height: 500}}/>
        </Card>
        <Card title='饼形图表3'>
          <ReactEChart option={this.getOption3()} theme="SuperK" style={{height: 500}}/>
        </Card>
      </PieWrapper>
    )
  }
}

export default Pie;
