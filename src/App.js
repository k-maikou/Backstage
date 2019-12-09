import React, { Component, Fragment } from 'react';
import { GlobalStyle, container, navLeft, main, content } from './style';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

import Header from './common/Header';
import Footer from './common/Footer';
import NavLeft from './common/NavLeft';

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <Fragment>
        <GlobalStyle/>
        <Row style={container}>
          <Col span={4} style={navLeft}><NavLeft/></Col>
          <Col span={20} style={main}>
            <Header/>
            <Row style={content}>
              { this.props.children }
            </Row>
            <Footer/>
          </Col>
        </Row>  
      </Fragment>
    )
  }
}

export default App;
