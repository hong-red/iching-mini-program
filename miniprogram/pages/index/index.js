// pages/index/index.js
Page({
  data: {
    hasUnread: false,
    avatar: '/images/avatar.png'
  },

  onLoad() {
    this.updateUnreadStatus();
    this.loadAvatar();
    this.ensureWelcomeNotification();
  },
  
  onShow(){
    this.checkAchievements();
    this.updateUnreadStatus();
    this.loadAvatar();
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

  loadAvatar(){
    try{
      const basic = wx.getStorageSync('profile_basic') || {};
      const userInfo = wx.getStorageSync('userInfo') || {};
      const avatar = basic.avatar || userInfo.avatarUrl || '/images/avatar.png';
      this.setData({ avatar });
    }catch(e){
      this.setData({ avatar: '/images/avatar.png' });
    }
  },
  
  ensureWelcomeNotification(){
    const sent = !!wx.getStorageSync('notif_welcome_sent');
    if (!sent){
      this.pushNotification({
        title: '欢迎来到智慧花园',
        content: '亲爱的小伙伴，开始收集六十四卦的智慧种子吧！达成里程碑会有惊喜称号，前往“我的花园”开始探索～'
      });
      wx.setStorageSync('notif_welcome_sent', true);
    }
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
    const collected = wx.getStorageSync('collectedGuas') || [];
    const count = Array.isArray(collected) ? collected.length : 0;
    
    // 里程碑阈值与称号
    const milestones = [
      { key: 'achv_1', threshold: 1,  title: '启蒙学徒', tip: '获得了第一个卦象，迈出探索的第一步！' },
      { key: 'achv_20', threshold: 20, title: '象意探索者', tip: '收集达到20个，继续加油！' },
      { key: 'achv_32', threshold: 32, title: '易理进阶者', tip: '收集达到32个，已具备扎实基础！' },
      { key: 'achv_52', threshold: 52, title: '卦象收藏家', tip: '收集达到52个，离满藏不远了！' },
      { key: 'achv_64', threshold: 64, title: '卦象小大师', tip: '集齐六十四卦！领取专属称号。' }
    ];

    milestones.forEach(m => {
      const done = !!wx.getStorageSync(m.key);
      if (!done && count >= m.threshold){
        this.pushNotification({
          title: `成就达成：${m.title}`,
          content: `${m.tip} 点击领取称号。`,
          action: 'claim_title',
          titleToGrant: m.title
        });
        wx.setStorageSync(m.key, true);
      }
    });
    
    // 终局祝贺消息（与领取称号不同的一条提示），只发一次
    const finalSent = !!wx.getStorageSync('notif_final_sent');
    if (!finalSent && count >= 64){
      this.pushNotification({
        title: '收藏完成：智慧花园',
        content: '你已集齐全部卦象，荣誉阁已点亮，去个人中心看看你的称号吧～'
      });
      wx.setStorageSync('notif_final_sent', true);
    }
  }
});
