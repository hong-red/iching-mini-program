// pages/game/game.js
const { getGuaByBinary } = require('../../utils/guaData');

Page({
  data: {
    yaoLines: [], // 存储爻线，从下往上 [yao6, yao5, yao4, yao3, yao2, yao1]
    currentGua: { name: '等待摇卦', symbol: '', explanation: '摇一摇，看看今天的提醒吧！' },
    hasBianGua: false,
    historyGua: [], // 存储最近5次摇卦历史
    showHistory: false,
    shakeCount: 0, // 记录当前摇卦次数，用于手动摇卦
    isShaking: false, // 防止重复摇卦
    aiExplanation: '', // AI 解释内容
    loadingAIExplanation: false, // AI 解释加载状态
    generatedGuaImage: '', // 存储生成的卦象图片路径
  },

  // 跳转到知识详情页
  goToKnowledgeDetail: function(e) {
    const guaName = e.currentTarget.dataset.guaname;
    console.log('Navigating to knowledge detail for:', guaName);
    if (guaName) {
      wx.navigateTo({
        url: `/pages/knowledgeDetail/knowledgeDetail?guaName=${guaName}`
      });
    }
  },

  onLoad() {
    // 页面加载时初始化
    this.initGuaDisplay();
    this.drawGuaImage(null, true); // 初始绘制问号图片
  },

  // 绘制卦象图片
  drawGuaImage(guaName, isInitial = false) {
    const ctx = wx.createCanvasContext('guaCanvas');
    const canvasWidth = 200;
    const canvasHeight = 200;

    // 绘制背景
    ctx.setFillStyle('#fdf5e6'); // 浅背景色，与首页背景色保持一致
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (isInitial) {
      // 绘制问号
      ctx.setFontSize(100);
      ctx.setFillStyle('#CCCCCC');
      ctx.setTextAlign('center');
      ctx.fillText('?', canvasWidth / 2, canvasHeight / 2 + 35);
    } else {
      // 绘制卦象名称
      ctx.setFontSize(30);
      ctx.setFillStyle('#4A90E2'); // 蓝色文字
      ctx.setTextAlign('center');
      ctx.fillText(guaName, canvasWidth / 2, canvasHeight / 2 + 10);
    }

    ctx.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'guaCanvas',
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
        destWidth: canvasWidth * 2, // 提高图片清晰度
        destHeight: canvasHeight * 2,
        success: res => {
          this.setData({
            generatedGuaImage: res.tempFilePath
          });
        },
        fail: err => {
          console.error('生成卦象图片失败', err);
        }
      });
    });
  },

  initGuaDisplay() {
    this.setData({
      yaoLines: [],
      currentGua: { name: '等待摇卦', symbol: '', explanation: '摇一摇，看看今天的提醒吧！' },
      hasBianGua: false,
      shakeCount: 0,
    });
    this.drawGuaImage(null, true); // 重置为问号图片
  },

  // 模拟摇卦，生成一个爻
  generateYao() {
    const random = Math.floor(Math.random() * 4); // 0, 1, 2, 3
    let yaoType = ''; // 老阴0，少阳1，少阴2，老阳3
    let lineType = ''; // 阴爻0，阳爻1
    let moving = false;

    if (random === 0) { // 老阴
      yaoType = 'laoyin';
      lineType = 'yin';
      moving = true;
    } else if (random === 1) { // 少阳
      yaoType = 'shaoyang';
      lineType = 'yang';
    } else if (random === 2) { // 少阴
      yaoType = 'shaoyin';
      lineType = 'yin';
    } else { // 老阳
      yaoType = 'laoyang';
      lineType = 'yang';
      moving = true;
    }
    return { yaoType, lineType, moving };
  },

  // 计算卦象
  calculateGua(yaoLines) {
    if (yaoLines.length !== 6) return;

    // 原始卦
    const originalBinary = yaoLines.map(yao => (yao.lineType === 'yang' ? '1' : '0')).join('');
    const originalGua = getGuaByBinary(originalBinary);

    // 变卦
    const bianYaoLines = yaoLines.map(yao => {
      if (yao.yaoType === 'laoyin') return { ...yao, lineType: 'yang' }; // 老阴变阳
      if (yao.yaoType === 'laoyang') return { ...yao, lineType: 'yin' }; // 老阳变阴
      return yao;
    });
    const bianBinary = bianYaoLines.map(yao => (yao.lineType === 'yang' ? '1' : '0')).join('');
    const bianGua = getGuaByBinary(bianBinary);

    const hasMovingYao = yaoLines.some(yao => yao.moving);
    const hasBianGua = hasMovingYao && (originalBinary !== bianBinary);

    let explanation = originalGua.kidExplain;
    if (hasBianGua) {
      explanation += ` 变卦为 ${bianGua.name}，${bianGua.kidExplain}`;
    }

    this.setData({
      currentGua: {
        name: originalGua.name,
        symbol: originalGua.symbol,
        explanation: explanation,
      },
      hasBianGua: hasBianGua,
    });

    // 绘制卦象图片
    this.drawGuaImage(originalGua.name);

    // 获取 AI 解释
    this.getAIExplanation(originalGua.name);
  },

  // 一键摇卦
  oneClickShake() {
    if (this.data.isShaking) return;
    this.setData({ isShaking: true });

    this.initGuaDisplay(); // 清空显示

    let tempYaoLines = [];
    let count = 0;
    const interval = setInterval(() => {
      if (count < 6) {
        const newYao = this.generateYao();
        tempYaoLines.unshift(newYao); // 从头部插入，实现从下往上显示
        this.setData({
          yaoLines: tempYaoLines,
        });
        count++;
      } else {
        clearInterval(interval);
        this.calculateGua(tempYaoLines);
        this.addToHistory(this.data.currentGua.name);
        this.setData({ isShaking: false });
      }
    }, 500); // 每隔0.5秒显示一个爻
  },

  // 手动摇卦
  manualShake() {
    if (this.data.isShaking || this.data.shakeCount >= 6) return;
    this.setData({ isShaking: true });

    if (this.data.shakeCount === 0) {
      this.initGuaDisplay();
    }

    const newYao = this.generateYao();
    const currentYaoLines = this.data.yaoLines;
    currentYaoLines.unshift(newYao); // 从头部插入

    this.setData({
      yaoLines: currentYaoLines,
      shakeCount: this.data.shakeCount + 1,
      isShaking: false,
    });

    if (this.data.shakeCount === 6) {
      this.calculateGua(currentYaoLines);
      this.addToHistory(this.data.currentGua.name);
    }
  },

  // 获取 AI 解释
  getAIExplanation: async function(guaName) {
    this.setData({ loadingAIExplanation: true, aiExplanation: '' });
    try {
      const res = await wx.cloud.callFunction({
        name: 'kimiChat',
        data: { prompt: guaName }
      });
      if (res.result && res.result.code === 0) {
        this.setData({ aiExplanation: res.result.data.replace(/\*\*/g, '') });
      } else {
        console.error('Cloud function kimiChat error:', res.result);
        this.setData({ aiExplanation: '未能获取 AI 解释，请稍后再试。' });
      }
    } catch (err) {
      console.error('Call cloud function kimiChat failed:', err);
      this.setData({ aiExplanation: '未能获取 AI 解释，请检查网络或稍后再试。' });
    } finally {
      this.setData({ loadingAIExplanation: false });
    }
  },

  // 保存到花园 (待实现)
  saveToGarden() {
    const { currentGua, generatedGuaImage } = this.data;

    if (!currentGua || !currentGua.name || currentGua.name === '等待摇卦') {
      wx.showToast({
        title: '请先摇卦再保存',
        icon: 'none'
      });
      return;
    }

    if (!generatedGuaImage) {
      wx.showToast({
        title: '卦象图片生成中，请稍候',
        icon: 'none'
      });
      return;
    }

    let collectedGuas = wx.getStorageSync('collectedGuas') || [];
    const existingGuaIndex = collectedGuas.findIndex(item => item.name === currentGua.name);

    if (existingGuaIndex === -1) {
      collectedGuas.push({
        name: currentGua.name,
        imagePath: generatedGuaImage,
        symbol: currentGua.symbol // 添加卦象符号
      });
      wx.setStorageSync('collectedGuas', collectedGuas);

      // 更新摇卦次数
      let shakeCount = wx.getStorageSync('shakeCount') || 0;
      shakeCount++;
      wx.setStorageSync('shakeCount', shakeCount);

      wx.showToast({
        title: '保存成功！',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '该卦象已存在于花园中',
        icon: 'none'
      });
    }
  },

  // 再摇一次
  shakeAgain() {
    this.initGuaDisplay();
  },

  // 添加到历史记录
  addToHistory(guaName) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
    const newHistory = [{ name: guaName, date: dateStr }, ...this.data.historyGua];
    if (newHistory.length > 5) {
      newHistory.pop(); // 只保留最近5条
    }
    this.setData({
      historyGua: newHistory,
    });
  },

  // 切换历史记录显示
  toggleHistory() {
    this.setData({
      showHistory: !this.data.showHistory,
    });
  },
});
