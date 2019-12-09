import React, { Component } from 'react';
import { GalleryWrapper } from '../style';
import { Card, Row, Col, Modal } from 'antd';

class Gallery extends Component {

  constructor(props) {
    super(props)

    this.state = {
      show: false
    }
  }

  openGallery = (imgSrc) => {
    this.setState(({
      currentImg: imgSrc,
      show: true
    }))
  }

  showImg = (show) => {
    this.setState({
      show
    })
  }

  render() {
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ];

    const imgList = imgs.map((list) => list.map((item) => 
      <Card
        cover={<img src={'/gallery/' + item} onClick={() => this.openGallery(item)} />}
        className='card'
      >
        <Card.Meta title="Look Img kkk" description="cooooooool..." />
      </Card>
    ));

    return (
      <GalleryWrapper>
        <Row gutter={10}>
          <Col md={5}>
            { imgList[0] }
          </Col>
          <Col md={5}>
            { imgList[1] }
          </Col>
          <Col md={5}>
            { imgList[2] }
          </Col>
          <Col md={5}>
            { imgList[3] }
          </Col>
          <Col md={4}>
            { imgList[4] }
          </Col>
        </Row>
        <Modal
          visible={this.state.show}
          onCancel={() => this.showImg(false)}
          style={{display: 'flex',justifyContent: 'center'}}
          width={600}
          title='Images~'
        >
          <img 
            src={'/gallery/' + this.state.currentImg}
            className='img'
            style={{width: '500px', height: '600px'}}
          />
        </Modal>
      </GalleryWrapper>
    )
  }
}

export default Gallery;
