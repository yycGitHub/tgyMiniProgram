module.exports = {
  miniProgramLogin: miniProgramLogin
}

var userWxInfo = {
  openid:null,
  unionid:null,
  sessionkey:null,
  nickname:null,
  avatarurl:null,
  gender:null,
  country:null,
  province:null,
  city:null
};
//小程序登录function
function miniProgramLogin(loginPage){
  wx.checkSession({
    success () {
      console.log('已登录！');
      getUserInfoByDataBase();
    },
    fail () {
      console.log('登录过期！')
      //重新登录
      loginMethod(loginPage);
  
    }
  })
  return '200';
}

//登录方法
function loginMethod (loginPage) {
  wx.login({
    success: res => {
      if (res.code) {
        //发起网络请求
        console.log('登录成功！' + res.code);
        //后台登录接口
        wx.request({
          url: loginPage.globalData.urlHead+'/wx/signInMiniproject',
          data: {
            code: res.code
          },
          success (ownRes) {
            console.log("返回json:"+ownRes.data.result)
            miniProgramGetUser(JSON.parse(ownRes.data.result),loginPage);
            return '200';
          }
        });
        
      } else {
        console.log('登录失败！' + res.errMsg)
        return 'false';
      }
    },
    fail: res => {
      console.log('登录失败！' + res.errMsg);
      return 'false';
    }
  })
}

//获取用户信息并保存
function miniProgramGetUser(userParam,loginPage){
  wx.showModal({
    title: '温馨提示',
    content: '正在请求您的个人信息',
    success(res) {
      if (res.confirm) {
        wx.getUserProfile({
        desc: "获取你的昵称、头像、地区及性别",
        success: userRes => {
          let userInfo = userRes.userInfo;
          console.log("获取用户信息JSON:"+JSON.stringify(userInfo));
          //保存微信用户信息
          userWxInfo.openid = userParam.openid;
          userWxInfo.unionid = userParam.unionid;
          userWxInfo.sessionkey = userParam.session_key;
          userWxInfo.nickname = userInfo.nickName;
          userWxInfo.avatarurl = userInfo.avatarUrl;
          userWxInfo.gender = userInfo.gender;
          userWxInfo.country = userInfo.country;
          userWxInfo.province = userInfo.province;
          userWxInfo.city = userInfo.city;
          wx.request({
           url: loginPage.globalData.urlHead+'/wx/saveWxUserWxInfo',
           method: 'post',
           header: {
            'Content-Type': 'application/json'
           },
           data: JSON.stringify(userWxInfo),
           success (saveRes) {
            console.log("保存成功JSON:"+JSON.stringify(userWxInfo));
           },
           fail (saveRes){
            return 'fail';
           }
             
         })
        },
        fail: res => {
           //拒绝授权
           wx.showModal({
              title: '温馨提示',
              content: '您拒绝了请求',
            })
            return 'false';
        }
      })} else if (res.cancel) {
        wx.showModal({
          title: '温馨提示',
          content: '您拒绝了请求',
        })
        return 'false';
      }
    }
  })
}

//查询登录用户信息
function getUserInfoByDataBase(){
  wx.getUserInfo({
    //desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
    success: (res) => {
      let userInfo = res.userInfo;
      console.log("保存成功JSON:"+JSON.stringify(userInfo));
    }
  })
}