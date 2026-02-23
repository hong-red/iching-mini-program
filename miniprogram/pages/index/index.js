// pages/index/index.js
Page({
  data: {
    // 首页不再需要摇卦相关数据
  },

  onLoad() {
    // 首页加载逻辑
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
  }
});