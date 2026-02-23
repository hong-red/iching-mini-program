// pages/creation/creation.js
const { guaList } = require('../../utils/guaData');

Page({
  data: {
    unlockedGuaCount: 0, // 已解锁卦象数量
    shakeCount: 0, // 摇卦次数
    gardenPlants: [], // 花园植物数据
    showReviewCard: false, // 是否显示回顾卡片
    currentReviewGua: {}, // 当前回顾的卦象数据
  },

  onLoad() {
    this.loadGardenData();
  },

  loadGardenData() {
    // 模拟从本地存储或服务器加载数据
    const mockUnlockedGua = [
      { name: "乾", image: "/images/plant_qian.png", acquisitionDate: "2023-01-01" },
      { name: "坤", image: "/images/plant_kun.png", acquisitionDate: "2023-01-05" },
    ];
    const mockShakeCount = 15;

    const plants = guaList.map(gua => {
      const unlocked = mockUnlockedGua.find(item => item.name === gua.name);
      return {
        id: gua.name,
        name: gua.name,
        symbol: gua.symbol,
        explanation: gua.kidExplain,
        isUnlocked: !!unlocked,
        image: unlocked ? unlocked.image : '',
        acquisitionDate: unlocked ? unlocked.acquisitionDate : '',
      };
    });

    this.setData({
      unlockedGuaCount: mockUnlockedGua.length,
      shakeCount: mockShakeCount,
      gardenPlants: plants,
    });
  },

  onPlantTap(e) {
    const plantId = e.currentTarget.dataset.plantId;
    const plant = this.data.gardenPlants.find(p => p.id === plantId);

    if (plant && plant.isUnlocked) {
      this.setData({
        currentReviewGua: {
          name: plant.name,
          explanation: plant.explanation,
          acquisitionDate: plant.acquisitionDate,
        },
        showReviewCard: true,
      });
    } else {
      wx.showToast({
        title: '学更多卦来解锁哦！',
        icon: 'none'
      });
    }
  },

  hideReviewCard() {
    this.setData({
      showReviewCard: false,
      currentReviewGua: {},
    });
  },

  doNothing() {
    // 阻止事件冒泡，防止点击回顾卡片内容时关闭卡片
  },

  showAchievements() {
    wx.showToast({
      title: '成就徽章功能待实现',
      icon: 'none'
    });
  },

  showSettings() {
    wx.showToast({
      title: '设置功能待实现',
      icon: 'none'
    });
  },

  dailySignIn() {
    wx.showToast({
      title: '每日签到功能待实现',
      icon: 'none'
    });
  },
});
