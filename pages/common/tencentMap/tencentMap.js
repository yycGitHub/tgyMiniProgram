// pages/common/tencentMap/tencentMap.js
var QQMapWX = require('qqmap-wx-jssdk.js');
//获取登录信息
var loginJs = require('../../../login.js');
var qqmapsdk;
var key = "NXCBZ-OIC6K-HTBJG-A4QCX-FACHT-APFC7";
var latitude = "28.14715";
var longitude = "113.0634";
var polyline = null;
var _this = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    polyline:polyline,
    latitude:latitude,
    longitude:longitude,
    key: key,
    markers: [{
      id: 1,
      latitude:latitude,
      longitude: longitude
    }],
    polyline: [{
      points: null,
      color: null,
      width: null
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    latitude=options.latitudegd;
    longitude=options.longitudegd;
    //腾讯地图
    qqmapsdk = new QQMapWX({
      key: key
    });


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }

 
})

function routePlan(qqmapsdk,routePlanData){

  qqmapsdk.direction({
    mode: routePlanData.mode,
    //from参数不填默认当前地址
    from: routePlanData.from,
    to: routePlanData.to, 
    success: function (res) {
      console.log(res);
      var ret = res;
      var coors = ret.result.routes[0].polyline, pl = [];
      //坐标解压（返回的点串坐标，通过前向差分进行压缩）
      var kr = 1000000;
      for (var i = 2; i < coors.length; i++) {
        coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
      }
      //将解压后的坐标放入点串数组pl中
      for (var i = 0; i < coors.length; i += 2) {
        pl.push({ latitude: coors[i], longitude: coors[i + 1] })
      }
      console.log(pl)
      //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
      _this.setData({
        latitude:pl[0].latitude,
        longitude:pl[0].longitude,
        polyline: [{
          points: pl,
          color: '#FF0000DD',
          width: 4
        }]
      })
    },
    fail: function (error) {
      console.error(error);
    },
    complete: function (res) {
      console.log(res);
    }
  });
}

