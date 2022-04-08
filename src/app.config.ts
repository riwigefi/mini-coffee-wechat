export default {
  pages: [
    'pages/index/index',
    'pages/order/index',
    'pages/practice/index',
    'pages/user/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#888',
    selectedColor: '#1eac52',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页'
      },
      {
        pagePath: 'pages/order/index',
        text: '订单'
      },
      {
        pagePath: 'pages/practice/index',
        text: '练习'
      },
      {
        pagePath: 'pages/user/index',
        text: '用户'
      }
    ]
  }
};
