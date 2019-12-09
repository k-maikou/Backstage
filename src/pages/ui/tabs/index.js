import React, { Component } from 'react';
import { TabWrapper } from '../style';
import { Card, Tabs, message, Icon } from 'antd';

class Tab extends Component {

    constructor(props) {
      super(props);
      this.newTabIndex = 0;
      const panes = [
        { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
        { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
        {
          title: 'Tab 3',
          content: 'Content of Tab 3',
          key: '3',
          closable: false,
        },
      ];
      this.state = {
        activeKey: panes[0].key,
        panes,
      };
    }

  handleCallback = (key) => {
    message.info({
      content: 'Hi，您选择了页签：' + key
    })
  }

  handleChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };

  render() {
    const { TabPane } = Tabs;
    return (
      <TabWrapper>

        <Card title='Tab页签' className='card'>
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab='Tab 1' key="1">
              这里是第一页哦~
            </TabPane>
            <TabPane tab='Tab 2' key="2">
              没错！这里是第二页~
            </TabPane>
            <TabPane tab='Tab 3' key="3">
              是第三页啦！笨蛋!
            </TabPane>
          </Tabs>
        </Card>

        <Card title='Tab页签加Icon' className='card'>
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab={<span><Icon type='wechat'/>微信</span>} key="1">
              这里是第一页哦~
            </TabPane>
            <TabPane tab={<span><Icon type='weibo'/>微博</span>} key="2">
              没错！这里是第二页~
            </TabPane>
            <TabPane tab={<span><Icon type='qq'/>QQ</span>} key="3">
              是第三页啦！笨蛋!
            </TabPane>
          </Tabs>
        </Card>

        <Card title='Tab页签添加删除' className='card'>
          <Tabs 
            // defaultActiveKey="1" 
            onChange={this.handleChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {this.state.panes.map((item) => (
              <TabPane 
                tab={<span><Icon type={item.type}/>{item.title}</span>} 
                key={item.key}
              >
                {item.content}
              </TabPane>
            ))}
          </Tabs>
        </Card>
      </TabWrapper>
    )
  }
}

export default Tab;
