import React, { Component } from 'react';
import Utils from '../../utils/utils';
import { Table } from 'antd';

class ETable extends Component {

  onRowClick = (record, index) => {
    let { rowSelection, updateSelectedItem } = this.props;
    if (rowSelection === 'checkbox') {
      let {selectedIds , selectedRowKeys, selectedItem } = this.props;
      if (selectedIds) {
        const i = selectedIds.indexOf(record.id);
        if (i == -1) {
          selectedIds.push(record.id);
          selectedRowKeys.push(index);
          selectedItem.push(record);
        } else {
          selectedIds.splice(i, 1);
          selectedRowKeys.splice(i, 1);
          selectedItem.splice(i, 1);
        }
      } else {
        selectedIds = [record.id];
        selectedRowKeys = [index];
        selectedItem = [record];
      }
      updateSelectedItem(selectedRowKeys, selectedItem, selectedIds);
    } else {
      let selectedRowKeys = [index];
      let selectedItem = record;
      updateSelectedItem(selectedRowKeys, selectedItem);
    }
  }

  tableInit = () => {
    let row_selected = this.props.rowSelection;
    let selectedRowKeys = this.props.selectedRowKeys;

    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }
    if (row_selected === false || row_selected === null) {
      row_selected = false;
    } else if (row_selected === 'checkbox') {
      rowSelection.type = 'checkbox';
    } else {
      row_selected = 'radio';
    }

    return(
      <Table
        {...this.props}
        rowSelection={row_selected ? rowSelection : null}
        style={{background: '#fff'}}
        onRow={(record, index) => {
          return {
            onClick: () => {
              if (!row_selected) return;
              this.onRowClick(record, index);
            }
          }
        }}
      />
    )
  }

  render() {
    return (
      <div>
        { this.tableInit() }
      </div>
    )
  }
}

export default ETable;
