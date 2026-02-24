// app.js
App({
  onLaunch() {
    wx.cloud.init({
      env: 'cloud1-1gbtaaga5d4f7e0c', // 请替换为您的云开发环境 ID
      traceUser: true,
    });

    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.login({
      success: res => {
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
