import React, { Component } from 'react';
import { MapWrapper, BikeWrapper } from './style';
import BaseForm from '../../common/BaseForm';
import axios from '../../network';
import { Card } from 'antd';

class Map extends Component {

  constructor(props) {
    super(props)

    this.state = {
      formListItem: [
        {
          type: 'SELECT',
          label: '城市',
          width: 80,
          initialValue: 1,
          list: [{id: 1, name: '全部'}, {id: 2, name: '北京'}, {id: 3, name: '深圳'}, {id: 4, name: '上海'}]
        },
        {
          type: '时间查询'
        },
        {
          type: 'SELECT',
          label: '订单状态',
          width: 80,
          initialValue: 1,
          list: [{id: 1, name: '全部'}, {id: 2, name: '完成'}, {id: 3, name: '未完成'}]
        }
      ],
      map: ''
    }
    this.params = {}
  }
  
  componentDidMount() {
    this.requestList();
  }

  // 查询表单
  handleFilterSubmit = (filterParams) => {
    this.params = filterParams;
    this.requestList();
  }

  requestList = async () => {
    let { data } = await axios.getBMapData(this.params);
    this.setState({
      total_count: data.result.total_count
    })
    this.requestMap(data)
    console.log(data)
  }

  requestMap = (data) => {
    let list = data.result.route_list;

    this.state.map = new window.BMap.Map('bike-container');
    this.state.map.addControl(new window.BMap.NavigationControl());
    let gpsOne = list[0].split(',');
    let gpsTwo = list[list.length - 1].split(',');
    let startPoint = new window.BMap.Point(gpsOne[0], gpsOne[1]);
    let endPoint = new window.BMap.Point(gpsTwo[0], gpsTwo[1]);
    this.state.map.centerAndZoom(endPoint, 11);

    let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });

    let bikeMarkerStart = new window.BMap.Marker(startPoint, {icon: startPointIcon});
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {icon: endPointIcon});
    this.state.map.addOverlay(bikeMarkerStart);
    this.state.map.addOverlay(bikeMarkerEnd);

    // 绘制车辆行驶路线
    let routerList = [];
    list.forEach((item) => {
      let p = item.split(',');
      routerList.push(new window.BMap.Point(p[0], p[1]))
    });

    let polyLine = new window.BMap.Polyline(routerList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    this.state.map.addOverlay(polyLine);

    // 绘制服务区
    let servicePointList = [];
    let serviceList = data.result.service_list;
    serviceList.forEach((item) => {
      servicePointList.push(new window.BMap.Point(item.lon, item.lat));
    })
    let polyServerLine = new window.BMap.Polyline(servicePointList, {
      strokeColor: 'black',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    this.state.map.addOverlay(polyServerLine);

    // 添加地图中的自行车图标
    let bikeList = data.result.bike_list;
    let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    bikeList.forEach((item) => {
      let p = item.split(',');
      console.log(p)
      let point = new window.BMap.Point(p[0], p[1]);
      let bikeMarker = new window.BMap.Marker(point, {icon: bikeIcon});
      this.state.map.addOverlay(bikeMarker);
    })

  }

  render() {
    return(
      <MapWrapper>
        <Card style={{marginBottom: 10}}>
          <BaseForm formList={this.state.formListItem} filterSubmit={this.handleFilterSubmit}/>
        </Card>
        <Card>
          <div>共100辆车</div>
          <BikeWrapper id='bike-container'></BikeWrapper>
        </Card>
      </MapWrapper>
    )
  }
}

export default Map;
