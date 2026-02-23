// pages/knowledgeDetail/knowledgeDetail.js
const { guaList } = require('../../utils/guaData');

Page({
  data: {
    gua: null, // 存储当前卦象的详细信息
    aiExplanation: '',
    loadingAIExplanation: false,
    showFullAIExplanation: false, // 新增：控制AI解释的显示状态
  },

  onLoad: function (options) {
    const guaName = options.guaName;
    if (guaName) {
      const currentGua = guaList.find(g => g.name === guaName);
      if (currentGua) {
        this.setData({
          gua: currentGua,
        });
        wx.setNavigationBarTitle({
          title: currentGua.name // 动态设置导航栏标题
        });
        this.getAIExplanation(currentGua.name); // Fetch AI explanation
      } else {
        console.error("未找到卦象:", guaName);
        wx.showToast({
          title: '卦象信息加载失败',
          icon: 'none'
        });
      }
    } else {
      console.error("未接收到卦象名称");
      wx.showToast({
        title: '卦象名称缺失',
        icon: 'none'
      });
    }
  },

    getAIExplanation: async function(guaName) {
      this.setData({
        loadingAIExplanation: true,
        aiExplanation: '' // Clear previous explanation
      });
      try {
        const res = await wx.cloud.callFunction({
          name: 'kimiChat',
          data: {
            prompt: guaName
          }
        });
        if (res.result && res.result.code === 0) {
          this.setData({
            aiExplanation: res.result.data
          });
        } else {
          console.error('Cloud function kimiChat error:', res.result);
          wx.showToast({
            title: 'AI解释加载失败',
            icon: 'none'
          });
        }
      } catch (err) {
        console.error('Call cloud function kimiChat failed:', err);
        wx.showToast({
          title: 'AI解释请求失败',
          icon: 'none'
        });
      } finally {
        this.setData({
          loadingAIExplanation: false
        });
      }
    },

    collectCard: function() {
    const gua = this.data.gua;
    if (!gua) {
      wx.showToast({
        title: '卦象信息缺失，无法收集',
        icon: 'none'
      });
      return;
    }

    // 获取已收集的卡片列表
    let collectedGuas = wx.getStorageSync('collectedGuas') || [];

    // 检查是否已收集
    const isCollected = collectedGuas.some(item => item.name === gua.name);

    if (isCollected) {
      wx.showToast({
        title: '您已收集过此卡片',
        icon: 'none'
      });
    } else {
      // 添加到收集列表
      collectedGuas.push({
        name: gua.name,
        binary: gua.binary,
        symbol: gua.symbol
      });
      wx.setStorageSync('collectedGuas', collectedGuas);
      wx.showToast({
        title: '收集成功！',
        icon: 'success'
      });
    }
  },

  // 新增：切换AI解释显示状态的方法
  toggleAIExplanation: function() {
    this.setData({
      showFullAIExplanation: !this.data.showFullAIExplanation
    });
  }
})
