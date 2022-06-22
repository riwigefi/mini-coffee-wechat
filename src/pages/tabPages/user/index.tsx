import React from 'react';
import { View, Text } from '@tarojs/components';

import TabPageLayout from '../TabPageLayout';

const Index = () => {
  return (
    <TabPageLayout>
      <View className='wrapper'>
        <Text>这是用户页面</Text>
      </View>
    </TabPageLayout>
  );
};

export default Index;
