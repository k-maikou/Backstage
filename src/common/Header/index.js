import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';
import Utils from '../../utils/utils';
import { actionCreators } from './store';
import {
  HeaderWrapper
} from './style';

class Header extends Component {

  componentDidMount() {
    const { handleDate, getWeatherApiData } = this.props;

    handleDate();
    getWeatherApiData();
  }

  render() {
    const { date, imgUrl, weather, menuType, title } = this.props;
    console.log(title)
    return (
      <HeaderWrapper>
        <Row className='header-top'>
          {
            menuType ? 
            <Col span={6} className='logo'>
              <img src="/assets/logo-ant.svg" alt=""/>
              <span>SuperKang 通用管理系统</span>
            </Col> : ''
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，麦扣-</span>
            <Button className='btn'>退出</Button>
          </Col>
        </Row>
        {
          menuType ? '' : 
          <Row className='breadcrumb'>
            <Col span={4} className='breadcrumb-title'>{title}</Col>
            <Col span={20} className='weather'>
              <span className='date'>{ date }</span>
              <span className='weather-detail'>
                <img src={imgUrl} alt=""/>
                { weather }
              </span>
            </Col>
          </Row>
        }
        
      </HeaderWrapper>
    )
  }

};

const mapState = (state) => ({
  date: state.getIn(['header', 'date']),
  imgUrl: state.getIn(['header', 'imgUrl']),
  weather: state.getIn(['header', 'weather']),
  title: state.getIn(['nav', 'navTitle'])
})

const mapDispatch = (dispatch) => ({
  handleDate() {
    setInterval(() => {
      let sysTime = Utils.formateDate(new Date().getTime());
      dispatch(actionCreators.getTime(sysTime));
    }, 1000);
  },
  getWeatherApiData() {
    dispatch(actionCreators.getWeatherData());
  }
})

export default connect(mapState, mapDispatch)(Header);
