import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

export default {
  formateDate(time) {
    if (!time) return '';
    let date = new Date(time);

    function size(date) {
      return date < 10 ? "0" + date : date;
    }

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + size(date.getHours()) + ':' + size(date.getMinutes()) + ':' + size(date.getSeconds());
  },
  pagination(data,callback){
      return {
          onChange:(current)=>{
              callback(current)
          },
          current:data.page,
          pageSize:data.page_size,
          total: data.total_count,
          showTotal:()=>{
              return `共${data.total_count}条`
          },
          showQuickJumper:true,
      }
  },
  getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = [];
    data.map((item) => {
      options.push(<Option value={item.id} key={item.id}>{item.name}</Option>)
    })
    return options;
  },
  updateSelectedItem(selectedRowKeys, selectedItem, selectedIds) {
    if (selectedIds) {
      this.setState({
        selectedRowKeys,
        selectedItem,
        selectedIds
      })
    }else {
      this.setState({
        selectedRowKeys,
        selectedItem
      })
    }
  }
}
