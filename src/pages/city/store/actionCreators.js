import * as constants from './constants';
import axios from '../../../network';

const sendDataToReducers = (cityList, data) => ({
  type: constants.SEND_DATA_TO_REDUCERS,
  cityList,
  data
});

const handleOnOk = (data) => ({
  type: constants.HANDLE_ON_OK,
  data
});

export const isShowButton = () => ({
  type: constants.IS_SHOW_BUTTON
});

export const clickHiddenModal = () => ({
  type: constants.CLICK_HIDDEN_MODAL
});

export const getHttpData = (page) => {
  return async (dispatch) => {
    let { data } = await axios.getCityList(page);
    console.log(data)
    const cityList = data.result.item_list.map((item, index) => {
      item.key = index;
      return item;
    });
    dispatch(sendDataToReducers(cityList, data));
  }
};

export const getCityHttp = (cityInfo) => {
  return async (dispatch) => {
    let { data } = await axios.getCityData(cityInfo);
    dispatch(handleOnOk(data))
  }
}
