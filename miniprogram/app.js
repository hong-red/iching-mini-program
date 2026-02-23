// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-1gbtaaga5d4f7e0c', // 请替换为您的云开发环境 ID
      traceUser: true,
    });

    // 检查登录状态
    const openid = wx.getStorageSync('openid');
    if (!openid) {
      // 如果没有openid，说明未登录，重定向到登录页面
      wx.redirectTo({
        url: '/pages/login/login'
      });
    } else {
      // 如果已登录，尝试获取用户信息
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.globalData.userInfo = userInfo;
      }
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录 (此处的wx.login不再用于判断是否已登录，而是获取code用于后续云函数调用)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // 此处逻辑已移至login页面和wechatLogin云函数
      }
    })
  },
  globalData: {
    userInfo: null
  }
})