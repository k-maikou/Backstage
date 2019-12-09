import React, { Component } from 'react';
import { CarouselWrapper } from '../style';
import { Carousel, Card } from 'antd';

class Carousels extends Component {
  render() {
    return (
      <CarouselWrapper>
        <Card title='文字轮播' className='card'>
          <Carousel autoplay dotPosition='left'>
            <div><h3>1</h3></div>
            <div><h3>2</h3></div>
            <div><h3>3</h3></div>
            <div><h3>4</h3></div>
          </Carousel>
        </Card>
        <Card title='图片轮播' className='card2'>
          <Carousel autoplay>
            <div><img style={{height: '300px', width: '100%'}} src="/carousel-img/carousel-1.jpg" alt=""/></div>
            <div><img style={{height: '300px', width: '100%'}} src="/carousel-img/carousel-2.jpg" alt=""/></div>
            <div><img style={{height: '300px', width: '100%'}} src="/carousel-img/carousel-3.jpg" alt=""/></div>
          </Carousel>
        </Card>
      </CarouselWrapper>
    )
  }
}

export default Carousels;
