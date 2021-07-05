// app.js
var loginJs = require('login.js');
App({
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var globalthis = this;
    //登录
    loginJs.miniProgramLogin(globalthis);
  },
  globalData: {
    urlHead: 'http://localhost:8081/'
  }
})
