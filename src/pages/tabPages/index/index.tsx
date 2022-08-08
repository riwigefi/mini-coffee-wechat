import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  Swiper,
  SwiperItem,
} from '@tarojs/components';

import { useEnv, useNavigationBar, useModal, useToast } from 'taro-hooks';

import ScalableImage from '../../../components/ScalableImage/index';

import useCustomNavigationBar from '../../../hooks/useCustomNavigationBar';

import TabPageLayout from '../TabPageLayout';

import logo from './hook.png';

import './index.scss';

const IMAGE_LIST = [
  'https://th.wallhaven.cc/small/y8/y8lqo7.jpg',
  'https://th.wallhaven.cc/small/rd/rdwjj7.jpg',
  'https://th.wallhaven.cc/small/zm/zm71gy.jpg',
];

const Index = () => {
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: 'Taro Hooks' });
  const [show] = useModal({
    title: 'Taro Hooks!',
    showCancel: false,
    confirmColor: '#8c2de9',
    confirmText: '支持一下',
    mask: true,
  });
  const [showToast] = useToast({ mask: true });

  const handleModal = useCallback(() => {
    show({ content: '不如给一个star⭐️!' }).then(() => {
      showToast({ title: '点击了支持!' });
    });
  }, [show, showToast]);

  const { statusBarHeight, customNavigationBarHeight } =
    useCustomNavigationBar();

  // const [maskVisible, setMaskVisible] = useState(false);

  useEffect(() => {}, []);

  return (
    <TabPageLayout>
      <View className='wrapper'>
        <View className='customNavigationBar'>
          <View
            className='statusBar'
            style={{
              height: statusBarHeight,
              backgroundColor: 'green',
            }}
          ></View>
          <View
            className='customNavigationBar'
            style={{
              height: customNavigationBarHeight,
              backgroundColor: 'red',
            }}
          ></View>
        </View>
        <View className='content'>
          <Image className='logo' src={logo} />
          <Text className='title'>为Taro而设计的Hooks Library</Text>
          <Text className='desc'>
            目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
            并结合ahook适配Taro!111222
          </Text>
          <View className='list'>
            <Text className='label'>运行环境111</Text>
            <Text className='note'>{env}</Text>
          </View>
          <Button
            className='button'
            onClick={() => setTitle('Taro Hooks Nice!')}
          >
            设置标题
          </Button>
          <Button className='button' onClick={handleModal}>
            使用Modal
          </Button>
          {/** 图片缩放组件 */}
          <Swiper
            className='test-h'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            vertical={false}
            circular
            indicatorDots
            style={{
              width: 500,
              height: 300,
            }}
          >
            {IMAGE_LIST.map((item) => (
              <SwiperItem key={item}>
                <ScalableImage src={item} />
              </SwiperItem>
            ))}
          </Swiper>
          {/* <ScalableImage /> */}
          <Button>进入放大模式</Button>

          {/* {Array(20)
            .fill(1)
            .map((item, idx) => (
              <View key={idx} className='item'>
                {item + idx}
              </View>
            ))} */}
        </View>
        {/* <View className='mask'>
          <ScalableImage isRotate />
        </View> */}
      </View>
    </TabPageLayout>
  );
};

export default Index;
