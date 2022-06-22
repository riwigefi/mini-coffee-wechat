import { useState, useEffect } from 'react';

import { getSystemInfo, getMenuButtonBoundingClientRect } from '@tarojs/taro';

export default function useCustomNavigationBar() {
  // 状态栏高度
  // 导航栏高度
  // 自定义导航栏高度 = 手机状态栏高度 + 胶囊高度 + 胶囊上下间距
  // 胶囊上下间距是一样的，在不同的设备上，胶囊上间距的值不同
  // 胶囊上间距的值 = 胶囊信息的top - 手机状态栏的高度

  const [statusBarHeight, setStatusBarHeight] = useState(0);

  const [customNavigationBarHeight, setCustomNavigationBarHeight] = useState(0);

  useEffect(() => {
    const init = async () => {
      const systemInfo = await getSystemInfo();
      const { statusBarHeight } = systemInfo;
      console.log('系统信息--', systemInfo);
      console.log('手机状态栏高度--', statusBarHeight);
      const menuButtonInfo = await getMenuButtonBoundingClientRect();
      const { top, bottom, height } = menuButtonInfo;
      console.log('胶囊信息top--', top, '胶囊信息bottom--', bottom);
      const topMargin = top - statusBarHeight;
      console.log('上间距--', topMargin);
      const customNavigationBarHeight = height + topMargin * 2;
      console.log('自定义导航栏高度--', customNavigationBarHeight);
      setStatusBarHeight(statusBarHeight);
      setCustomNavigationBarHeight(customNavigationBarHeight);
    };
    init();
  }, []);

  return {
    statusBarHeight,
    customNavigationBarHeight,
  };
}
