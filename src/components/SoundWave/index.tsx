import React from 'react';
import { View } from '@tarojs/components';

import './index.scss';

const SoundWave = () => {
  return (
    <View className='sound-wave'>
      {Array(20)
        .fill(1)
        .map((_, idx) => (
          <View className='bar' key={idx}></View>
        ))}
    </View>
  );
};

export default SoundWave;
