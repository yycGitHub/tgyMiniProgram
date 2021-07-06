// app.js
var loginJs = require('login.js');
var isConnectWebSocket = false;
var latitudegd = "28.14715";
var longitudegd = "113.0634";
App({
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var globalthis = this;
    //登录
    loginJs.miniProgramLogin(globalthis);
    //连接websocket
    connectSocketMethod();

  },
  globalData: {
    urlHead: 'http://localhost:8081/'
  }
})
//连接websocke
function connectSocketMethod(){
  var SocketTask = wx.connectSocket({
    url: 'ws://localhost:8081/ws/websocket/tgy/'+wx.getStorageSync('key'),
    timeout:'10000',
    success (res) {
      console.log("WEBSOCKET连接成功："+JSON.stringify(res));
      isConnectWebSocket = true;
    },
    fail(res) {
      console.log("WEBSOCKET连接失败："+res);
    }
  });
  if (isConnectWebSocket) {
    SocketTask.onOpen(()=>{
      SocketTask.onMessage(function(data){
        //如果是命令类型为导航则跳转
        console.log("socketMessage:"+JSON.stringify(data));
        var newData = JSON.parse(data.data);
        if (newData.navigationType==1) {
          //getLocalGps();
          wx.navigateTo({
            path: 'pages/common/tencentMap/tencentMap.wxml?routePlanData='+newData,
            success(res) {
              console.log("socketMessage:"+JSON.stringify(res));
            }
          })
        }
      })
    });
  }
}

//获取用户当前位置
function getLocalGps(){
  wx.getLocation({
    type: 'gcj02',
    success (res) {
      latitudegd = res.latitude
      longitudegd = res.longitude
    }
   })
}
