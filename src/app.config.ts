export default {
  pages: [
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
};
