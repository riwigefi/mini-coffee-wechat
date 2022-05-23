import React from 'react';
import { View, Text } from '@tarojs/components';

import './index.scss';

const Index = () => {
  const items = [1, 2, 3];

  return (
    <View className='order'>
      <Text>这是订单</Text>
      <View className='itemList'>
        {items.map((item, idx) => (
          <View className='item' key={idx}>
            <View className='inner'>{item}</View>
            <View className='radius after'></View>
          </View>
        ))}
      </View>
      <View className='radius'></View>

      <View className='example'></View>
    </View>
  );
};

export default Index;
