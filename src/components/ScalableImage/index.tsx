import React, { useState } from 'react';

import {
  ITouchEvent,
  CommonEventFunction,
} from '@tarojs/components/types/common';

import { ImageProps } from '@tarojs/components/types/Image';

import { View, Image } from '@tarojs/components';

import useUsers from '@/customHooks/useUsers';

const MIN_SCALE = 0.6;
const MAX_SCALE = 2;

const ScalableImage: React.FC<{
  src?: string;
}> = ({ src = 'https://th.wallhaven.cc/small/z8/z8dg9y.jpg' }) => {
  const [distance, setDistance] = useState(0);
  const [scale, setScale] = useState(1);

  useUsers('1233333');

  const [imageBaseInfo, setImageBaseInfo] = useState({
    baseWidth: 0,
    baseHeight: 0,
  });

  const [imageScaleInfo, setImageScaleInfo] = useState({
    scaleWidth: 0,
    scaleHeight: 0,
  });

  const imageLoadHandler: CommonEventFunction<ImageProps.onLoadEventDetail> = (
    e
  ) => {
    const width = Number(e.detail.width) || 0;
    const height = Number(e.detail.height) || 0;
    console.log('图片大小--', width, height);
    setImageBaseInfo({
      baseWidth: width,
      baseHeight: height,
    });
    setImageScaleInfo({
      scaleWidth: width,
      scaleHeight: height,
    });
  };

  const touchStartHandler = (e: ITouchEvent) => {
    // 单手缩放，不做任何操作
    if (e.touches.length === 1) return;
    // 双手缩放，进行处理
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let distance = Math.sqrt(xMove * xMove + yMove * yMove);
    setDistance(distance);
  };

  const touchMoveHandler = (e: ITouchEvent) => {
    // 单手缩放，不做任何操作
    if (e.touches.length === 1) return;
    let xMove = e.touches[1].clientX - e.touches[0].clientX;
    let yMove = e.touches[1].clientY - e.touches[0].clientY;
    let newDistance = Math.sqrt(xMove * xMove + yMove * yMove);
    let distanceDiff = newDistance - distance;
    let newScale = scale + 0.005 * distanceDiff;
    // 为了防止缩放得太大或太小，需要限制scale
    newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));

    console.log('当前缩放得倍率--', newScale);

    const newImageScaleInfo = {
      scaleWidth: newScale * imageBaseInfo.baseWidth,
      scaleHeight: newScale * imageBaseInfo.baseHeight,
    };

    setDistance(newDistance);
    setScale(newScale);
    setImageScaleInfo(newImageScaleInfo);
  };

  return (
    <View onTouchStart={touchStartHandler} onTouchMove={touchMoveHandler}>
      <Image
        src={src}
        onLoad={imageLoadHandler}
        style={{
          width: `${imageScaleInfo.scaleWidth}px`,
          height: `${imageScaleInfo.scaleHeight}px`,
        }}
      />
    </View>
  );
};

export default ScalableImage;
