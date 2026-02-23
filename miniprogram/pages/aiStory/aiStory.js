// pages/aiStory/aiStory.js
Page({
  data: {
    guaName: '',
    aiStory: '',
    loadingStory: false,
  },

  onLoad: function (options) {
    if (options.guaName) {
      this.setData({
        guaName: options.guaName
      });
      this.getAIStory(options.guaName);
    }
  },

  getAIStory: async function (guaName) {
    this.setData({ loadingStory: true, aiStory: '' });
    try {
      const prompt = `请为卦象“${guaName}”创作一个富有哲理的智慧小故事，字数在200字左右，故事内容要积极向上，能够给人以启发。`;
      const res = await wx.cloud.callFunction({
        name: 'kimiChat',
        data: { prompt: prompt }
      });
      if (res.result && res.result.code === 0) {
        // 移除 ** 符号，并替换换行符为 <br/> 以便 rich-text 正确渲染
        const formattedStory = res.result.data.replace(/\*\*/g, '').replace(/\n/g, '<br/>');
        this.setData({ aiStory: formattedStory });
      } else {
        console.error('Cloud function kimiChat error:', res.result);
        this.setData({ aiStory: '未能获取 AI 故事，请稍后再试。' });
      }
    } catch (err) {
      console.error('Call cloud function kimiChat failed:', err);
      this.setData({ aiStory: '未能获取 AI 故事，请检查网络或稍后再试。' });
    } finally {
      this.setData({ loadingStory: false });
    }
  },
})