/**
 * 小程序埋点sdk设计思路
 * 站在用户的角度上可以分析出微信小程序收集的方式有两种
 * 1. 生命周期：用户打开小程序或者进入页面时通过生命周期函数自动收集
 * 2. 自定义事件：用户触发某次点击时通过自定义事件去收集
 *
 * 小程序 => 入口模板(index.ts) => (自定义事件模块（event.ts） + 数据收集模块（stat.ts）)
 * 入口模块：负责与小程序进行通讯，负责把定义好的自定义事件导出给小程序使用，负责把数据传给数据收集模块
 * 自定义事件模块：负责定义好业务拓展需要的自定义事件模块
 * 数据收集模块：负责定义好服务端需要的数据，上传给服务端
 */

import Taro from '@tarojs/taro';

// 入口模板首先需要拦截`App`、`Page`里面的生命周期函数，然后插入自己的埋点代码
// 需要额外主要的是页面page的`onShareAppMessage`事件，它通常会有返回值

export const gatherOrDispatchStat = () => {
  console.log('收集或者上传数据');
};

export const statClick = () => {
  console.log('自定义点击事件');
};

// 小程序全局实例

const App = wx.App;

// 小程序页面实例
const pages = wx.Page;

/**
 * 拦截 App | Page 实例的方法
 * @param {Object} instanceData App | Page 实例化传入的option
 * @param {String} name option 的 key
 * @param {Function} callback 回调函数
 */
const _handleInstanceMethod = function (
  instanceData: { [key: string]: unknown },
  name: string,
  callback: (...args: unknown[]) => void
) {
  if (instanceData[name]) {
    const originalMethod = instanceData[name] as (...args: unknown[]) => void;
    instanceData[name] = function (...args: unknown[]) {
      callback.call(this, args);
      originalMethod.call(this, args);
    };
  } else {
    instanceData[name] = function (...args: unknown[]) {
      callback.call(this, args);
    };
  }
};

// 拦截App
