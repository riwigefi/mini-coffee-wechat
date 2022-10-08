import React, { useEffect, useState } from 'react';
import { View, ScrollView } from '@tarojs/components';

import SoundWave from '@/components/SoundWave';

import './index.scss';

interface IGroup {
  id: string;
  name: string;
  completed: boolean;
}

const testGroups: IGroup[] = [];

for (let i = 0; i < 10; i++) {
  testGroups.push({
    id: i + '',
    name: '题组' + i,
    completed: i === 8,
  });
}

const TestAutoScroll = () => {
  const [groups, setGroups] = useState<IGroup[]>([]);

  const scrollIntoViewId = 'group' + groups.filter((g) => g.completed)?.[0]?.id;

  console.log('应该滚动到的id--', scrollIntoViewId);

  useEffect(() => {
    setGroups(testGroups);
  }, []);

  return (
    <>
      <View className='testAutoScroll'>
        <ScrollView
          scrollY
          scrollWithAnimation
          scrollIntoView={scrollIntoViewId}
          className='groupList'
        >
          {groups.map((g) => (
            <View id={'group' + g.id} className='group' key={g.id}>
              {g.name}
            </View>
          ))}
        </ScrollView>
      </View>
      <View className='fullMask'>
        <View className='soundWaveOutContainer'>
          <View className='soundWaveInnerContainer'>
            <SoundWave></SoundWave>
          </View>
        </View>
        <View className='btnContainer'>
          <View className='btn'>X</View>
          <View className='btn'>文</View>
        </View>
        <View className='tip'>松开发送</View>
        <View className='ellipse ellipse1'></View>
        <View className='ellipse ellipse2'></View>
      </View>
    </>
  );
};

export default TestAutoScroll;
