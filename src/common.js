import React, { Component } from 'react';
import { CommonWrapper, container } from './style';
import { Row } from 'antd';
import 'antd/dist/antd.css';

import Header from './common/Header';

class Common extends Component {
  render() {
    return (
      <CommonWrapper>
        <Row style={container} className='simple-page'>
          <Header menuType="second"/>
        </Row>
        <Row className='content'>
          { this.props.children }
        </Row>
      </CommonWrapper>
    )
  }
}

export default Common;
