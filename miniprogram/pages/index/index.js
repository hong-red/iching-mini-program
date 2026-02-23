// pages/index/index.js
Page({
  data: {
    hasUnread: false
  },

  onLoad() {
    this.updateUnreadStatus();
  },
  
  onShow(){
    this.checkAchievements();
    this.updateUnreadStatus();
  },

  // 卡片点击跳转方法
  goToKnowledge() {
    wx.switchTab({
      url: '/pages/knowledge/knowledge'
    });
  },

  goToGame() {
    wx.switchTab({
      url: '/pages/game/game'
    });
  },

  goToGardenWithStoryPrompt() {
    wx.setStorageSync('showStoryPrompt', true); // 设置标志
    wx.switchTab({
      url: '/pages/garden/garden'
    });
  },

  goToGarden() {
    wx.switchTab({
      url: '/pages/garden/garden'
    });
  },

  goToProfile() {
    wx.navigateTo({
      url: '/pages/profile/profile'
    });
  },

  openNotifications(){
    wx.navigateTo({
      url: '/pages/notifications/notifications'
    });
  },
  
  updateUnreadStatus(){
    const hasUnread = !!wx.getStorageSync('notif_has_unread');
    this.setData({ hasUnread });
  },

  pushNotification(n){
    const list = wx.getStorageSync('notifications') || [];
    // 增加格式化时间
    const now = new Date();
    const timeFormatted = `${now.getMonth()+1}月${now.getDate()}日 ${now.getHours()}:${now.getMinutes()}`;
    list.unshift(Object.assign({ id: String(Date.now()), timeFormatted }, n));
    wx.setStorageSync('notifications', list);
    wx.setStorageSync('notif_has_unread', true);
    this.setData({ hasUnread: true });
  },
  
  checkAchievements(){
    const awarded = !!wx.getStorageSync('achv_64_awarded');
    const collected = wx.getStorageSync('collectedGuas') || [];
    if (!awarded && Array.isArray(collected) && collected.length >= 64){
      this.pushNotification({
        title: '成就达成：集齐六十四卦',
        content: '太棒了！你已集齐六十四卦，点击领取惊喜与称号。',
        action: 'claim_64',
      });
      wx.setStorageSync('achv_64_awarded', true);
    }
  }
});
