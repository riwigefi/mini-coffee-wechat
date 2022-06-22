import React from 'react';
import { View } from '@tarojs/components';

import './index.scss';

const TabPageLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <View className='tab-page'>
      <View className='main'>{children}</View>
      <View className='mock-tab-ele'></View>
    </View>
  );
};

export default TabPageLayout;
