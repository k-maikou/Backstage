import { fromJS } from 'immutable';
import * as constants from './constants';
import Utils from '../../../utils/utils';

const defaultState = fromJS({
  columns: [
    {
      title: '城市ID',
      dataIndex: 'id',
    },
    {
      title: '城市名称',
      dataIndex: 'name'
    },
    {
      title: '用车模式',
      dataIndex: 'mode',
      render(mode) {
        return mode === 1 ? '停车点' : '禁停区';
      }
    },
    {
      title: '营运模式',
      dataIndex: 'op_mode',
      render(mode) {
        return mode === 1 ? '自营' : '加盟';
      }
    },
    {
      title: '授权加盟商',
      dataIndex: 'franchisee_name',
    },
    {
      title: '城市管理员',
      dataIndex: 'city_admins',
      render(arr) {
        return arr.map((item) => {
          return item.user_name;
        }).join(',');
      }
    },
    {
      title: '城市开通时间',
      dataIndex: 'open_time',
    },
    {
      title: '操作时间',
      dataIndex: 'update_time',
      render: Utils.formateDate
    },
    {
      title: '操作人',
      dataIndex: 'sys_user_name',
    }
  ],
  cityList: [],
  data: [],
  isShowOpenCity: false,
  openData: []
});

export default (state = defaultState, action) => {
  switch (action.type) {
  case constants.SEND_DATA_TO_REDUCERS:
    return state.merge({
      cityList: fromJS(action.cityList),
      data: fromJS(action.data.result)
    });

  case constants.IS_SHOW_BUTTON:
    return state.set('isShowOpenCity', true);

  case constants.CLICK_HIDDEN_MODAL:
    return state.set('isShowOpenCity', false);

  case constants.HANDLE_ON_OK:
    return state.merge({
      isShowOpenCity: false,
      openData: action.data
    });

    default:
      return state;
  }
}
