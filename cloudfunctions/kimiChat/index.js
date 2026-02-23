const cloud = require('wx-server-sdk');
const axios = require('axios');
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

exports.main = async (event, context) => {
  const { prompt } = event;
  const kimiApiKey = 'sk-OysQAuYdnQbrL1ObbEZ234lFVeqFDalGcFz11SdyFnhcp36d'; // Your Kimi API Key



  if (!prompt) {
    console.log('kimiChat Cloud Function returning: Prompt is required');
    return {
      code: -1,
      msg: 'Prompt is required',
    };
  }

  try {
    const response = await axios.post(
      'https://api.moonshot.cn/v1/chat/completions',
      {
        model: 'moonshot-v1-8k', // Or another suitable Kimi model
        messages: [
          { role: 'system', content: '你是一个易经专家，擅长用儿童能够理解的语言解释卦象。请严格使用纯文本格式进行回复，**绝对不要使用任何Markdown语法，包括但不限于星号（*）进行加粗、井号（#）作为标题、连字符（-）作为列表、反引号（`）作为代码块等。** 你的回复必须是完全没有格式标记的纯文本。' }, 
          { role: 'user', content: `请用儿童能够理解的语言，详细解释一下“${prompt}”这个卦象的含义和它给我们的启示。` },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${kimiApiKey}`,
        },
      }
    );


    const markdownContent = response.data.choices[0].message.content;
    console.log('Original Markdown Content:', markdownContent); // Add this line

    const result = {
      code: 0,
      msg: 'Success',
      data: markdownContent, // 直接返回原始 Markdown 内容
    };

    return result;
  } catch (error) {
    console.error('Kimi API Error caught in cloud function:', error.response ? error.response.data : error.message);
    const errorResult = {
      code: -1,
      msg: 'Failed to get response from Kimi API',
      error: error.response ? error.response.data : error.message,
    };

    return errorResult;
  }
};