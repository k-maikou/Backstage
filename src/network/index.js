import JsonP from 'jsonp';
import { request, request2 } from './request';

class Axios {
  // jsonp跨域
  static getJsonp() {

    return new Promise((resolve, reject) => {
      JsonP('http://api.map.baidu.com/telematics/v3/weather?location=shenzhen&output=json&ak=3p49MVra6urFRGOT9s8UBWr2', {
        // 请求头要携带回调
        param: 'callback'
      }, function (err, response) {
        if (response.status === 'success') {
          // 接收url得到的数据resolve返回出去，外界通过then获取数据
          resolve(response);
        }else {
          // 返回错误信息
          reject(err);
        }
      })
    })

  }

  // axios请求
  static getHttpData = (url) => {
    return request({
      url,
      params: {
        page: 1
      }
    })
  }

  // 请求城市管理
  static getCityList = (page) => {
    return request({
      url: '/open_city',
      params: {
        page
      }
    })
  }

  // 开通城市
  static getCityData = (cityInfo) => {
    return request({
      url: '/cilty/open',
      params: {
        cityInfo
      }
    })
  }

  // 订单管理
  static getOrderList = (params) => {
    return request2({
      url: '/api/orderList.json',
      params
    })
  }

  // 结束订单
  static getOrderConfirm = (id) => {
    return request2({
      url: '/api/ebikeInfo.json',
      params: {
        orderId: id
      }
    })
  }

  //结束订单回调
  static getFinishOrder = (id) => {
    return request2({
      url: '/api/finishOrder.json',
      params: {
        orderId: id
      }
    })
  }

  // 订单基础信息
  static getOrderDetail = (id) => {
    return request2({
      url: '/api/orderDetail.json',
      params: {
        orderId: id
      }
    })
  }

  // 获取用户信息系
  static getUserList = (params) => {
    return request2({
      url: '/api/userList.json',
      params
    })
  }

  // 创建用户 - 编辑用户
  static getUserPush = (type, params) => {
    return request2({
      url: type === 'create' ? '/api/userPush.json' : '/api/userEdit.json',
      params
    })
  }

  // 删除用户
  static getUserDelete = (id) => {
    return request2({
      url: 'api/userDelete.json',
      params: {
        id
      }
    })
  }

  // 获取百度地图
  static getBMapData = (params) => {
    return request2({
      url: 'api/bikeMap.json',
      params
    })
  }

  // 获取员工数据
  static getPermissionData = (param) => {
    return request2({
      url: 'api/roleList.json',
      param
    })
  }

  // 创建员工
  static getRolePush = (param) => {
    return request2({
      url: 'api/rolePush.json',
      param
    })
  }

  // 员工权限
  static getRolePerm = (param) => {
    return request2({
      url: 'api/rolePerm.json',
      param
    })
  }

  // 用户授权
  static getRoleUserList = (id) => {
    return request2({
      url: 'api/roleUserList.json',
      param: {
        id
      }
    })
  }

  // 授权提交
  static getRoleUserEdit = (data) => {
    return request2({
      url: 'api/roleUserEdit.json',
      param: {...data}
    })
  }

}

export default Axios;
