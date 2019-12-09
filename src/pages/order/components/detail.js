import React, { Component } from 'react';
import { DetailWrapper, DetailMap, DetailItem, ItemTitle, DetailForm } from '../style';
import { Card } from 'antd';
import axios from '../../../network';

class Detail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      orderInfo: {}
    }
  }

  componentDidMount() {
    let { orderId } = this.props.match.params;
    if (orderId) {
      this.getDetailInfo(orderId);
    }
  }

  getDetailInfo = async (orderId) => {
    let { data } = await axios.getOrderDetail(orderId);
    this.setState({
      orderInfo: data.result
    });
    this.renderMap(data.result);
  }

  // 添加地图
  renderMap = (result) => {
    this.map = new window.BMap.Map('orderDetailMap');
    this.map.centerAndZoom('北京', 11);  
    // 添加地图控件
    this.addMapControl();
    // 调用路线图绘制方法
    this.draBikeRoute(result.position_list);
    // 调用服务区绘制方法
    this.drawServiceArea(result.area);
  }


  // 添加地图控件
  addMapControl = () => {
    let map = this.map;
    map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT}));
    map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
  }

  // 绘制用户的行驶路线
  draBikeRoute = (positionList) => {
    let map = this.map;
    let startPoint = '';
    let endPoint = '';
    if (positionList.length) {
      let first = positionList[0];
      let last = positionList[positionList.length - 1];

      startPoint = new window.BMap.Point(first.lon, first.lat);
      let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      });
      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
      this.map.addOverlay(startMarker);

      endPoint = new window.BMap.Point(last.lon, last.lat);
      let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(36, 42)
      });
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
      this.map.addOverlay(endMarker);

      // 连接路线图
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));        
      }

      let poyLine = new window.BMap.Polyline(trackPoint, {
        strokerColor: '#1869AD',
        strokerWeight: 3,
        strokerOpacity: 1
      })

      this.map.addOverlay(poyLine);

      this.map.centerAndZoom(trackPoint, 11); 
    }
  }

  // 绘制服务区
  drawServiceArea = (positionList) => {

    let trackPoint = [];
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));        
    }

    let polygon = new window.BMap.Polygon(trackPoint, {
      strokerColor: '#CE0000',
      strokerWeight: 4,
      strokerOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity: 0.4
    })
    this.map.addOverlay(polygon);
  }

  render() {
    const { 
      mode, 
      order_sn, 
      bike_sn, 
      user_name, 
      mobile, 
      start_location, 
      end_location, 
      distance 
    } = this.state.orderInfo;
    console.log(this.state.orderInfo);
    return (
      <DetailWrapper>
        <Card>
          <DetailMap id='orderDetailMap'></DetailMap>
          <DetailItem>
            <ItemTitle>基础信息</ItemTitle>
            <DetailForm>
              <li>
                <div className='form-left'>用车模式</div>
                <div className='form-content'>{mode === 1 ? '服务区' : '停车点'}</div>
              </li>
              <li>
                <div className='form-left'>订单编号</div>
                <div className='form-content'>{order_sn}</div>
              </li>
              <li>
                <div className='form-left'>车辆编号</div>
                <div className='form-content'>{bike_sn}</div>
              </li>
              <li>
                <div className='form-left'>用户姓名</div>
                <div className='form-content'>{user_name}</div>
              </li>
              <li>
                <div className='form-left'>手机号码</div>
                <div className='form-content'>{mobile}</div>
              </li>
            </DetailForm>
          </DetailItem>
          <DetailItem>
            <ItemTitle>行驶轨迹</ItemTitle>
            <DetailForm>
              <li>
                <div className='form-left'>行驶起点</div>
                <div className='form-content'>{start_location}</div>
              </li>
              <li>
                <div className='form-left'>行驶终点</div>
                <div className='form-content'>{end_location}</div>
              </li>
              <li>
                <div className='form-left'>行驶里程</div>
                <div className='form-content'>{distance / 1000}公里</div>
              </li>
            </DetailForm>
          </DetailItem>
        </Card>
      </DetailWrapper>
    )
  }
}

export default Detail;
