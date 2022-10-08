export default {
  pages: [
    'pages/testAutoScroll/index',
    'pages/tabPages/index/index',
    'pages/tabPages/order/index',
    'pages/tabPages/practice/index',
    'pages/tabPages/user/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  tabBar: {
    custom: true,
    color: '#888',
    selectedColor: '#1eac52',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/tabPages/index/index',
        text: '首页',
      },
      {
        pagePath: 'pages/tabPages/order/index',
        text: '订单',
      },
      {
        pagePath: 'pages/tabPages/practice/index',
        text: '练习',
      },
      {
        pagePath: 'pages/tabPages/user/index',
        text: '用户',
      },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序定位',
    },
  },
  plugins: {
    chooseLocation: {
      version: '1.0.9',
      provider: 'wx76a9a06e5b4e693e',
    },
    routePlan: {
      version: '1.0.19',
      provider: 'wx50b5593e81dd937a',
    },
  },
  // subPackages里面的可以单独放在一个目录
  subPackages: [
    {
      root: 'pages/testCanvas',
      name: 'testCanvas',
      pages: ['index'],
    },
    {
      root: 'pages/testRoutePlan',
      name: 'testRoutePlan',
      pages: ['index'],
    },
    {
      root: 'pages/testImage',
      name: 'testImage',
      pages: ['index'],
    },
  ],
};
