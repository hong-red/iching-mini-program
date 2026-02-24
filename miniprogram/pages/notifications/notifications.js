Page({
  data: {
    notifications: []
  },

  onLoad() {
    this.loadNotifications();
    this.markAsRead();
  },

  loadNotifications() {
    const list = wx.getStorageSync('notifications') || [];
    this.setData({
      notifications: list
    });
  },

  markAsRead() {
    // 标记已读
    wx.setStorageSync('notif_has_unread', false);
  },

  claimAchievement(e) {
    const id = e.currentTarget.dataset.id;
    // 授予称号并写入个人资料
    const basic = wx.getStorageSync('profile_basic') || {};
    const title = e.currentTarget.dataset.title || '卦象小大师';
    const honors = wx.getStorageSync('profile_honors') || [];
    if (honors.indexOf(title) === -1) honors.push(title);
    const updated = Object.assign({}, basic, { title });
    wx.setStorageSync('profile_basic', updated);
    wx.setStorageSync('profile_honors', honors);
    wx.showToast({ title: `已授予称号：${title}`, icon: 'success' });
    
    // 移除当前通知
    const list = (this.data.notifications || []).filter(n => n.id !== id);
    this.setData({ notifications: list });
    wx.setStorageSync('notifications', list);
    
    // 尝试更新云端资料（如果已登录）
    this.writeProfileToDB(Object.assign({}, updated, { honors }));
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
