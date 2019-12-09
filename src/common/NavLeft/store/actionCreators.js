import * as constants from './constants';

export const handleListData = (menuTreeNode) => ({
  type: constants.HANDLE_LIST_DATA,
  menuTreeNode
});

export const handleNavTitle = (item) => ({
  type: constants.HANDLE_NAV_TITLE,
  item
})
