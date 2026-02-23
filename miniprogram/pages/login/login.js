// miniprogram/pages/login/login.js
Page({
  data: {
    hasAgreedPrivacy: false
  },

  onLoad() {

  },

  togglePrivacyAgreement(e) {
    this.setData({
      hasAgreedPrivacy: e.detail.value.length > 0
    });
  },

  async onGetUserInfo(e) {
    if (!this.data.hasAgreedPrivacy) {
      wx.showToast({
        title: '请先阅读并同意用户协议和隐私政策',
        icon: 'none'
      });
      return;
    }

    // 检查用户是否拒绝授权
    if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
      wx.showToast({
        title: '您取消了授权',
        icon: 'none'
      });
      return;
    }

    try {
      // 1. 获取登录凭证 code
      const {
        code
      } = await wx.login();

      // 2. 获取用户资料（通过 e.detail.userInfo 获取，因为 open-type="getUserInfo" 已经包含了）
      const userInfo = e.detail.userInfo;

      // 3. 调用云函数进行登录
      const res = await wx.cloud.callFunction({
        name: 'wechatLogin',
        data: {
          code: code,
          userInfo: userInfo
        }
      });

      if (res.result && res.result.code === 0) {
        const {
          openid
        } = res.result.data;
        // 存储 openid 和用户信息
        wx.setStorageSync('openid', openid);
        wx.setStorageSync('userInfo', userInfo);
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        });
        console.log('微信登录成功:', openid, userInfo);
        // 登录成功后跳转到首页
        wx.reLaunch({
          url: '/pages/index/index'
        });
      } else {
        wx.showToast({
          title: res.result.message || '登录失败',
          icon: 'none'
        });
        console.error('微信登录失败:', res.result);
      }
    } catch (err) {
      wx.showToast({
        title: '登录失败，请重试',
        icon: 'none'
      });
      console.error('微信登录异常:', err);
    }
  },

  goToUserAgreement() {
    wx.navigateTo({
      url: '/pages/agreement/user-agreement'
    });
  },

  goToPrivacyPolicy() {
    wx.navigateTo({
      url: '/pages/agreement/privacy-policy'
    });
  }
});
