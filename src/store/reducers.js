import { combineReducers } from 'redux-immutable';
import { reducers as navReducers } from '../common/NavLeft/store';
import { reducers as headerReducers } from '../common/Header/store';
import { reducers as homeReducers } from '../pages/home/store';
import { reducers as cityReducers } from '../pages/city/store';

const reducers = combineReducers({
  nav: navReducers,
  header: headerReducers,
  home: homeReducers,
  city: cityReducers
})

export default reducers;
