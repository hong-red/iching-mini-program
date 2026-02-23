// pages/knowledge/knowledge.js
const { guaList } = require('../../utils/guaData');

Page({
  data: {
    unlockedGuaCount: 0, // 初始解锁数量
    totalGuaCount: 64, // 总卦象数量
    progressPercent: 0, // 进度百分比
    guaList: [], // 存储卦象列表
    filteredGuaList: [], // 存储过滤后的卦象列表
    searchKeyword: '',
  },

  onLoad() {
    // 页面加载时初始化卦象列表
    this.setData({
      guaList: guaList,
      filteredGuaList: guaList, // 初始显示所有卦象
    });
    this.getCollectedGuaCount(); // 在初始化卦象列表后调用
  },

  onShow() {
    this.getCollectedGuaCount(); // 每次页面显示时更新收集进度
  },

  // 搜索功能
  onSearchInput(e) {
    const keyword = e.detail.value.toLowerCase();
    const filteredList = this.data.guaList.filter(gua =>
      gua.name.includes(keyword) ||
      gua.meaning.includes(keyword) ||
      gua.core.includes(keyword) ||
      gua.kidExplain.includes(keyword)
    );
    this.setData({
      filteredGuaList: filteredList,
      searchKeyword: keyword,
    });
  },

  getCollectedGuaCount: function() {
    const collectedGuas = wx.getStorageSync('collectedGuas') || [];
    this.setData({
      unlockedGuaCount: collectedGuas.length,
      totalGuaCount: 64, // Total number of hexagrams
      progressPercent: (collectedGuas.length / 64) * 100
    });
  },

  goToGuaDetail(e) {
    const guaName = e.currentTarget.dataset.guaName;
    wx.navigateTo({
      url: `/pages/knowledgeDetail/knowledgeDetail?guaName=${guaName}`,
    });
  },
});
