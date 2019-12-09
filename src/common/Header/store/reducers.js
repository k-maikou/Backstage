import * as constants from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  date: '',
  imgUrl: null,
  weather: ''
});

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.GET_TIME:
      return state.set('date', action.date);
    
    case constants.GET_WEATHER_API:
      return state.merge({
        imgUrl: action.imgUrl,
        weather: action.weather
      })

    default:
      return state;
  }
};
