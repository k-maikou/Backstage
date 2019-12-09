import React, { Component } from 'react';
import menuData from '../../../config/menuConfig';
import { Form, Input, Select, Tree } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class PermissionForm extends Component {

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key}>
            { this.renderTreeNodes(item.children) }
          </TreeNode>
        )
      }
      return <TreeNode title={item.title} key={item.key} />
    })
    
  }

  onCheck = (keys) => {
    this.props.patchMenuInfo(keys);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detailInfo, menuInfo } = this.props;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 10}
    }
    return(
      <Form layout='horizontal'>
        <FormItem label='角色名称' { ...formItemLayout }>
          <Input disabled placeholder={ detailInfo.role_name } />
        </FormItem>
        <FormItem label='状态' { ...formItemLayout }>
          {
            getFieldDecorator('status', {
              initialValue: detailInfo.status
            })(
              <Select>
                <Option value={0}>启用</Option>
                <Option value={1}>停用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          checkable
          defaultExpandAll
          onCheck={(checkedKeys) => {
            this.onCheck(checkedKeys)
          }}
          checkedKeys={menuInfo}
        >
          <TreeNode title='平台权限' key='platform_all'>
            { this.renderTreeNodes(menuData) }
          </TreeNode>
        </Tree>
      </Form>
    )
  }
}

PermissionForm = Form.create({})(PermissionForm);

export default PermissionForm;
