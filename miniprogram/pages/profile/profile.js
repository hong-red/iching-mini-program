// miniprogram/pages/profile/profile.js
Page({
  data: {
    avatar: '/images/avatar.png',
    nickname: '微信用户',
    phone: '',
    birthday: '',
    gender: '男'
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadUserInfo();
  },

  loadUserInfo() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    const basic = wx.getStorageSync('profile_basic') || {};
    this.setData({
      avatar: '/images/avatar.png', // 默认小女孩头像
      nickname: basic.nickname || userInfo.nickName || '微信用户',
      phone: basic.phone || '',
      birthday: basic.birthday || '',
      gender: basic.gender || '男',
      title: basic.title || ''
    });
    this.fetchProfileFromDB();
  },

  onNameInput(e) { this.setData({ nickname: e.detail.value }); },
  onPhoneInput(e) { this.setData({ phone: e.detail.value }); },
  onDateChange(e) { this.setData({ birthday: e.detail.value }); },
  onGenderChange(e) { this.setData({ gender: e.detail.value }); },

  saveProfile() {
    const { nickname, phone, birthday, gender, avatar, title } = this.data;
    if (phone && !/^\d{11}$/.test(phone)) {
      wx.showToast({ title: '手机号需为11位数字', icon: 'none' });
      return;
    }
    wx.setStorageSync('profile_basic', { nickname, phone, birthday, gender, avatar, title });
    wx.showToast({ title: '已保存', icon: 'success' });
    this.writeProfileToDB({ nickname, phone, birthday, gender, avatarFileId: avatar, title });
  },

  changeAvatar() {
    const openid = wx.getStorageSync('openid');
    if (!openid) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const filePath = res.tempFilePaths[0];
        const cloudPath = `avatars/${openid}_${Date.now()}.jpg`;
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: (up) => {
            const fileID = up.fileID;
            this.setData({ avatar: fileID });
            const { nickname, phone, birthday, gender, title } = this.data;
            wx.setStorageSync('profile_basic', { nickname, phone, birthday, gender, avatar: fileID, title });
            this.writeProfileToDB({ nickname, phone, birthday, gender, avatarFileId: fileID, title });
            wx.showToast({ title: '头像已更新', icon: 'success' });
          },
          fail: () => wx.showToast({ title: '上传失败', icon: 'none' })
        });
      }
    });
  },

  fetchProfileFromDB() {
    const openid = wx.getStorageSync('openid');
    if (!openid) return;
    const db = wx.cloud.database();
    db.collection('profiles').doc(openid).get({
      success: (res) => {
        const d = res.data || {};
        const avatar = d.avatarFileId || this.data.avatar;
        const nickname = d.nickname || this.data.nickname;
        const phone = d.phone || this.data.phone;
        const birthday = d.birthday || this.data.birthday;
        const gender = d.gender || this.data.gender;
        const title = d.title || this.data.title; // 优先使用数据库中的称号，或者保留本地称号
        this.setData({ avatar, nickname, phone, birthday, gender, title });
        wx.setStorageSync('profile_basic', { nickname, phone, birthday, gender, avatar, title });
      }
    });
  },

  writeProfileToDB(payload) {
    const openid = wx.getStorageSync('openid');
    if (!openid) return;
    const db = wx.cloud.database();
    db.collection('profiles').doc(openid).set({
      data: Object.assign({}, payload, { updatedAt: new Date() })
    });
  }
});
