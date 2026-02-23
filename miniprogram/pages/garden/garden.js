// pages/garden/garden.js
Page({
  data: {
    collectedGuas: [],
    shakeCount: 0, // 摇卦次数，待从全局或本地存储获取
    emptySlots: [], // 用于填充未解锁的卦象
  },

  onLoad(options) {
    // onLoad 不再处理 fromStoryEntry 参数
  },

  onShow() {
    this.loadCollectedGuas();
    this.loadShakeCount();

    // 检查是否从智慧故事入口跳转过来，并显示提示
    const showStoryPrompt = wx.getStorageSync('showStoryPrompt');
    if (showStoryPrompt) {
      console.log('花园页面：准备显示智慧故事提示弹窗');
      wx.showModal({
        title: '智慧故事',
        content: '点击已收集的卦象，即可查看AI为您生成的智慧故事哦！',
        showCancel: false,
        confirmText: '我知道了'
      });
      wx.removeStorageSync('showStoryPrompt'); // 每次显示后立即清除标志
    }
  },

  loadCollectedGuas() {
    const collectedGuas = wx.getStorageSync('collectedGuas') || [];
    this.setData({
      collectedGuas: collectedGuas,
      emptySlots: Array(64 - collectedGuas.length).fill({}) // 填充剩余的空位
    });
  },

  loadShakeCount() {
    // 假设摇卦次数存储在本地，或者从其他页面传递过来
    const shakeCount = wx.getStorageSync('shakeCount') || 0;
    this.setData({
      shakeCount: shakeCount
    });
  },

  goToAIStory: function(e) {
    const guaName = e.currentTarget.dataset.guaname;
    if (guaName) {
      wx.navigateTo({
        url: `/pages/aiStory/aiStory?guaName=${guaName}`
      });
    }
  },
})
