# 卦象奇缘 - 儿童易经启蒙微信小程序

一款专为儿童设计的易经启蒙微信小程序，通过趣味互动的方式帮助孩子了解易经文化、认识卦象、学习传统智慧。

## 项目简介

本项目基于 **Taro 4 + React + TypeScript** 开发，支持多端编译（微信小程序、H5、字节跳动小程序等），后端采用 **微信云开发**（云函数 + 云数据库），并集成 **Kimi AI** 提供智能卦象解读。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端框架 | Taro 4.1.9 + React + TypeScript |
| 样式方案 | SCSS / WXSS |
| 后端服务 | 微信云开发（Cloud Functions） |
| AI 能力 | Kimi (Moonshot) API |
| 构建工具 | Webpack + Babel |

## 功能模块

### 1. 首页
- 轮播图展示
- 功能入口导航（识象、占卜、花园、故事）

### 2. 识象（知识学习）
- 易经基础知识科普
- 卦象详解与学习
- 知识详情页深度阅读

### 3. 占卜（互动游戏）
- 趣味占卜互动
- 卦象生成与解读
- AI 智能解卦（基于 Kimi）

### 4. 花园（创作社区）
- 用户创作分享
- 社区互动

### 5. AI 故事
- 基于卦象的 AI 生成故事
- 儿童友好的语言风格

### 6. 个人中心
- 微信登录
- 消息通知
- 用户协议与隐私政策

## 项目结构

```
周易微信小程序/
├── cloudfunctions/           # 微信云函数
│   ├── kimiChat/            # Kimi AI 聊天/解卦云函数
│   ├── wechatLogin/         # 微信登录云函数
│   └── quickstartFunctions/ # 快速开始示例云函数
├── miniprogram/             # 微信小程序原生代码（主包）
│   ├── pages/               # 小程序页面
│   │   ├── index/           # 首页
│   │   ├── knowledge/       # 识象页
│   │   ├── game/            # 占卜页
│   │   ├── garden/          # 花园页
│   │   ├── aiStory/         # AI 故事页
│   │   ├── creation/        # 创作页
│   │   ├── login/           # 登录页
│   │   ├── profile/         # 个人中心
│   │   ├── notifications/   # 消息通知
│   │   ├── knowledgeDetail/ # 知识详情
│   │   └── agreement/       # 用户协议/隐私政策
│   ├── components/          # 公共组件
│   ├── utils/               # 工具函数
│   │   ├── guaData.js       # 卦象数据（64卦 + 八卦）
│   │   └── util.js          # 通用工具
│   ├── images/              # 静态图片资源
│   └── app.json             # 小程序全局配置
├── src/                     # Taro 源码（React + TS）
│   ├── pages/               # Taro 页面
│   ├── styles/              # 全局样式/主题
│   └── app.tsx              # Taro 应用入口
├── config/                  # Taro 环境配置
│   ├── dev.ts               # 开发环境
│   ├── prod.ts              # 生产环境
│   └── index.ts             # 基础配置
├── types/                   # TypeScript 类型定义
├── package.json             # 项目依赖与脚本
├── project.config.json      # 微信小程序项目配置
└── tsconfig.json            # TypeScript 配置
```

## 快速开始

### 环境要求
- Node.js >= 18
- 微信开发者工具
- 微信小程序账号（开通云开发）

### 安装依赖

```bash
npm install
```

### 开发模式（微信小程序）

```bash
npm run dev:weapp
```

使用微信开发者工具打开项目根目录，设置项目路径为生成的 `dist/` 文件夹。

### 其他端开发

```bash
# H5
npm run dev:h5

# 字节跳动小程序
npm run dev:tt

# 支付宝小程序
npm run dev:alipay
```

### 生产构建

```bash
npm run build:weapp
```

## 云函数部署

1. 在微信开发者工具中开通云开发环境
2. 右键 `cloudfunctions/kimiChat` 选择「创建并部署：云端安装依赖」
3. 右键 `cloudfunctions/wechatLogin` 选择「创建并部署：云端安装依赖」
4. 在 `miniprogram/envList.js` 中配置云环境 ID

## 配置说明

### Kimi API 配置
在 `cloudfunctions/kimiChat/index.js` 中配置你的 Kimi API Key：

```javascript
const kimiApiKey = 'your-kimi-api-key';
```

### 云环境配置
在 `miniprogram/envList.js` 中配置云开发环境：

```javascript
const envList = ['your-cloud-env-id'];
```

## 卦象数据

项目内置完整的易经卦象数据：

- **八卦**：乾、兑、离、震、巽、坎、艮、坤
- **六十四卦**：每卦包含名称、含义、核心思想、儿童化解释

数据文件位于 `miniprogram/utils/guaData.js`。

## 参考文档

- [Taro 文档](https://docs.taro.zone/)
- [微信云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [Kimi API 文档](https://platform.moonshot.cn/docs)

## 开源协议

本项目仅供学习交流使用。
