import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import menuConfig from '../../config/menuConfig';
import { actionCreators } from './store';
import { Menu } from 'antd';
import {
  NavWrapper,
  NavLogo
} from './style';
const { SubMenu } = Menu;

class NavLeft extends PureComponent {

  componentDidMount() {
    //菜单渲染
    const menuTreeNode =  this.handleData(menuConfig);
    this.props.renderMenu(menuTreeNode);
  }

  

  handleData = (list) => {
    
    return list.map((item) => {
      if (item.children) {
        return (<SubMenu title={item.title} key={item.key}>
          { this.handleData(item.children) }
        </SubMenu>)
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{ item.title }</NavLink>
        </Menu.Item>
      )
    });

  }

  render() {
    const { list, handleClick } = this.props;
    return (
      <NavWrapper>
        <NavLogo>
          <img src="/assets/logo-ant.svg" alt="" />
          <h1>Super KK</h1>
        </NavLogo>
        <Menu theme="dark" onClick={handleClick}>
          { list }
        </Menu>
      </NavWrapper>
    )
  }
  
};

const mapState = (state) => ({
  list: state.getIn(['nav', 'menuTreeNode']).toJS()
})

const mapDispatch = (dispatch) => ({
  renderMenu(menuTreeNode) {
    dispatch(actionCreators.handleListData(menuTreeNode));
  },
  handleClick({item, index}){
    console.log(item.props.title)
    dispatch(actionCreators.handleNavTitle(item.props.title))
  }
});

export default connect(mapState, mapDispatch)(NavLeft);
