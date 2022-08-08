import React from 'react';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';

import TabPageLayout from '../TabPageLayout';

const IMAGE_LIST = [
  'https://th.wallhaven.cc/small/y8/y8lqo7.jpg',
  'https://th.wallhaven.cc/small/rd/rdwjj7.jpg',
  'https://th.wallhaven.cc/small/zm/zm71gy.jpg',
];

const Index = () => {
  return (
    <TabPageLayout>
      <Swiper
        indicatorColor='#999'
        indicatorActiveColor='#333'
        vertical={false}
        circular
        indicatorDots
        style={{
          width: '100vw',
          height: '100vh',
        }}
      >
        {IMAGE_LIST.map((item) => (
          <SwiperItem key={item}>
            <Image src={item} />
          </SwiperItem>
        ))}
      </Swiper>
    </TabPageLayout>
  );
};

export default Index;
