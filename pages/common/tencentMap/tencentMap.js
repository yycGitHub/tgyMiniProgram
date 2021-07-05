// pages/common/tencentMap/tencentMap.js
var QQMapWX = require('qqmap-wx-jssdk.js');
//获取登录信息
var loginJs = require('../../../login.js');
var qqmapsdk;
var key = "NXCBZ-OIC6K-HTBJG-A4QCX-FACHT-APFC7";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:23.00229,
    longitude:113.3345211,
    key: key
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //连接websocket
    connectSocketMethod();
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

function connectSocketMethod(){
  wx.connectSocket({
    url: 'ws://localhost:8081/ws/websocket/tgy',
    timeout:'10000',
    success (res) {
      console.log("WEBSOCKET连接成功："+JSON.stringify(res));
    },
    fail(res) {
      console.log("WEBSOCKET连接失败："+res);
    }
  })
}