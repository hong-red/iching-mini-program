// miniprogram/pages/profile/profile.js
Page({
  data: {
    avatar: '/images/avatar.png',
    nickname: '微信用户',
    phone: '',
    birthday: '',
    gender: '',
    honors: []
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
    const honors = wx.getStorageSync('profile_honors') || [];
    // 如果存在单一称号字段，合并到荣誉列表中
    if (basic.title && honors.indexOf(basic.title) === -1) {
      honors.push(basic.title);
      wx.setStorageSync('profile_honors', honors);
    }
    const avatar = basic.avatar || userInfo.avatarUrl || '/images/avatar.png';
    this.setData({
      avatar,
      nickname: basic.nickname || userInfo.nickName || '微信用户',
      phone: basic.phone || '',
      birthday: basic.birthday || '',
      gender: basic.gender || '',
      title: basic.title || '',
      honors
    });
    this.fetchProfileFromDB();
  },

  onNameInput(e) { this.setData({ nickname: e.detail.value }); },
  onPhoneInput(e) { this.setData({ phone: e.detail.value }); },
  onDateChange(e) { this.setData({ birthday: e.detail.value }); },
  onGenderChange(e) { this.setData({ gender: e.detail.value }); },

  saveProfile() {
    const { nickname, phone, birthday, gender, avatar, title, honors } = this.data;
    if (phone && !/^\d{11}$/.test(phone)) {
      wx.showToast({ title: '手机号需为11位数字', icon: 'none' });
      return;
    }
    wx.setStorageSync('profile_basic', { nickname, phone, birthday, gender, avatar, title });
    wx.setStorageSync('profile_honors', honors || []);
    wx.showToast({ title: '已保存', icon: 'success' });
    // 合规：云端仅保存头像、昵称、称号与荣誉列表
    this.writeProfileToDB({ nickname, avatarFileId: avatar, title, honors: honors || [] });
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
            // 合规：云端仅保存头像、昵称、称号与荣誉列表
            const honors = wx.getStorageSync('profile_honors') || [];
            this.writeProfileToDB({ nickname, avatarFileId: fileID, title, honors });
            wx.showToast({ title: '头像已更新', icon: 'success' });
            // 实时同步到上一页（如首页）
            try {
              const pages = getCurrentPages();
              if (pages && pages.length >= 2) {
                const prev = pages[pages.length - 2];
                if (prev && typeof prev.setData === 'function') {
                  prev.setData({ avatar: fileID });
                }
              }
            } catch (e) {}
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
        const basicLocal = wx.getStorageSync('profile_basic') || {};
        const userInfo = wx.getStorageSync('userInfo') || {};
        const avatar = d.avatarFileId || basicLocal.avatar || userInfo.avatarUrl || this.data.avatar || '/images/avatar.png';
        const nickname = d.nickname || basicLocal.nickname || this.data.nickname;
        const title = d.title || basicLocal.title || this.data.title;
        const honorsFromDB = d.honors || [];
        const honorsLocal = wx.getStorageSync('profile_honors') || [];
        const honors = Array.from(new Set([].concat(honorsLocal, honorsFromDB, title ? [title] : [])));
        // 本地可继续保留 phone/birthday/gender，但不从云端覆盖
        const phone = basicLocal.phone || this.data.phone;
        const birthday = basicLocal.birthday || this.data.birthday;
        const gender = basicLocal.gender || this.data.gender;
        this.setData({ avatar, nickname, phone, birthday, gender, title, honors });
        wx.setStorageSync('profile_basic', { nickname, phone, birthday, gender, avatar, title });
        wx.setStorageSync('profile_honors', honors);
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
