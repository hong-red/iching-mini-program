const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async () => {
  try {
    const wxContext = cloud.getWXContext();
    return {
      code: 0,
      data: {
        openid: wxContext.OPENID
      },
      message: '登录成功'
    };
  } catch (err) {
    console.error('微信登录失败', err);
    return {
      code: -1,
      data: null,
      message: '微信登录失败'
    };
  }
};
