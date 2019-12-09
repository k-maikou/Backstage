import React, { Component } from 'react';
import { Form, Input, Select, Transfer } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class RoleAuthForm extends Component {


  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;

  handleChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  }

  render() {
    const { detailInfo, targetKeys, mockData } = this.props;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 15}
    }
    const locale = {
      itemUnit: '项', 
      itemsUnit: '项', 
      searchPlaceholder: '请输入搜索内容'
    }
    return(
      <Form layout='horizontal'>
        <FormItem label='角色名称' {...formItemLayout}>
          <Input disabled placeholder={detailInfo.role_name} />
        </FormItem>
        <FormItem label='选择用户' {...formItemLayout}>
          <Transfer
            listStyle={{width: 200, height: 400}}
            dataSource={mockData}
            titles={['待选用户', '已选用户']}
            showSearch
            locale={ locale }
            filterOption={this.filterOption}
            targetKeys={targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    )
  }
}

RoleAuthForm = Form.create({})(RoleAuthForm);

export default RoleAuthForm;
