import React, { useState } from 'react';
import { setStorageSync } from '@tarojs/taro';
import { View, Swiper, SwiperItem } from '@tarojs/components';

import ScalableImage from '@/components/ScalableImage';

import './index.scss';

const IMAGE_LIST = [
  // 'https://w.wallhaven.cc/full/j5/wallhaven-j57l85.jpg',
  // 'https://w.wallhaven.cc/full/q6/wallhaven-q6pe87.jpg',
  'https://th.wallhaven.cc/small/y8/y8lqo7.jpg',
  'https://th.wallhaven.cc/small/rd/rdwjj7.jpg',
  'https://th.wallhaven.cc/small/zm/zm71gy.jpg',
];

// 抽出来的组件
const Extra: React.FC<{
  idx: number;
}> = ({ idx }) => {
  switch (idx + 1) {
    case 1:
      return null;
    case 2:
      return <View>Ball</View>;
    default:
      return null;
  }
};

const Index = () => {
  setStorageSync('isATourAuth', true);

  const [current, setCurrent] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const testEnglishText = `An observable represents a stream, or source of data that can arrive over time. You can create an observable from nearly anything, but the most common use case in RxJS is from events. This can be anything from mouse moves, button clicks, input into a text field, or even route changes. The easiest way to create an observable is through the built in creation functions. For example, we can use the fromEvent helper function to create an observable of mouse click events`;

  const testText = `需要展示的蚊子很多，不方便全部显示；多行文本省略；需要展示的蚊子很多，不方便全部显示；多行文本省略`;

  return (
    <>
      <View className='container'>
        <View className='multi-line'>{testEnglishText}</View>
        {/* <Swiper
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
            <SwiperItem key={item} className='swiperItem'>
              <ScalableImage src={item} />
            </SwiperItem>
          ))}
        </Swiper> */}
        <View className='img-container'>
          {IMAGE_LIST.map((item, idx) => (
            <View
              key={idx}
              style={{
                display: idx === current ? 'block' : 'none',
              }}
            >
              <Extra idx={idx} />
              <ScalableImage src={item} />
            </View>
          ))}
        </View>
        <View className='action'>
          <View
            className='btn'
            onClick={() => {
              if (current > 0) {
                setCurrent((c) => c - 1);
              } else {
                setCurrent(IMAGE_LIST.length - 1);
              }
            }}
          >
            上一个
          </View>
          <View
            className='btn'
            onClick={() => {
              if (current < IMAGE_LIST.length - 1) {
                setCurrent((c) => c + 1);
              } else {
                setCurrent(0);
              }
            }}
          >
            下一个
          </View>
        </View>
      </View>

      <View onClick={showModal}>展示弹框</View>
      <View onClick={hideModal}>隐藏弹框</View>

      <View
        style={{ display: modalVisible ? 'flex' : 'none' }}
        className='fullMask'
      >
        <View className='modal'>
          <View className='innerContainer'>
            <View className='content' onTouchMove={(e) => e.stopPropagation}>
              庆历四年春2，滕子京谪守巴陵郡3。越明年4，政通人和5，百废具兴6。乃重修岳阳楼7，增其旧制8，刻唐贤今人诗赋于其上9。属予作文以记之10。
              予观夫巴陵胜状11，在洞庭一湖。衔远山12，吞长江13，浩浩汤汤14，横无际涯15；朝晖夕阴，气象万千16。此则岳阳楼之大观也17，前人之述备矣18。然则北通巫峡19，南极潇湘20，迁客骚人21，多会于此22，览物之情，得无异乎23？
              若夫淫雨霏霏24，连月不开25，阴风怒号26，浊浪排空27；日星隐曜28，山岳潜形29；商旅不行30，樯倾楫摧31；薄暮冥冥32，虎啸猿啼。登斯楼也，则有去国怀乡33，忧谗畏讥34，满目萧然35，感极而悲者矣36。
              至若春和景明37，波澜不惊38，上下天光39，一碧万顷；沙鸥翔集，锦鳞游泳40；岸芷汀兰41，郁郁青青42。而或长烟一空43，皓月千里44，浮光跃金45，静影沉璧46，渔歌互答47，此乐何极48！登斯楼也，则有心旷神怡49，宠辱偕忘50，把酒临风51，其喜洋洋者矣52。
              嗟夫53！予尝求古仁人之心54，或异二者之为55。何哉？不以物喜，不以己悲56；居庙堂之高则忧其民57；处江湖之远则忧其君58。是进亦忧，退亦忧。然则何时而乐耶？其必曰：“先天下之忧而忧，后天下之乐而乐”乎59。噫！微斯人，吾谁与归60？
              时六年九月十五日
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Index;
