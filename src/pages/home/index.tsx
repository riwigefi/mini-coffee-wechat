import React from 'react';
import { View, Text } from '@tarojs/components';

import styles from './index.module.scss';

const MyView = React.forwardRef((props, ref) => {
  return <View {...props} ref={ref} />;
});

const Index = () => {
  return (
    <View className={styles.container}>
      <Text>这是首页</Text>
    </View>
  );
};

export default Index;
