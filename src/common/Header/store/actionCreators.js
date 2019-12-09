import * as constants from './constants';
import axios from '../../../network';

const getWeatherApi = (data) => ({
  type: constants.GET_WEATHER_API,
  imgUrl: data.dayPictureUrl,
  weather: data.weather
})

export const getTime = (date) => ({
  type: constants.GET_TIME,
  date
});

export const getWeatherData = () => {
  return async (dispatch) => {

    let {results} = await axios.getJsonp({});
    const data = results[0].weather_data[0];
    dispatch(getWeatherApi(data));
  }
};
