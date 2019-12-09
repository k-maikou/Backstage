import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  menuTreeNode: [],
  navTitle: ''
});

export default (state = defaultState, action) => {

  switch (action.type) {
    case constants.HANDLE_LIST_DATA:
      return state.set('menuTreeNode', fromJS(action.menuTreeNode));
    
    case constants.HANDLE_NAV_TITLE:
      return state.set('navTitle', action.item);

    default:
      return state;
  }

};
