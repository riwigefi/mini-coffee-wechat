import React, { useEffect, useRef } from 'react';
import { createSelectorQuery, useReady, getSystemInfoSync } from '@tarojs/taro';
import { View, Canvas, Image } from '@tarojs/components';

const BgImg = `https://th.wallhaven.cc/small/wq/wqve97.jpg`;

const AvatarImg = `https://i0.hdslb.com/bfs/bigfun/e6ba29d4a8f9115aef55c0ab05ebae98bde3c6b0.png@800w.webp`;

const Index = () => {
  const canvasCtx = useRef<any>(null);

  const changeObj = (obj, str) => {
    console.log('obj--', obj, str);
    obj.name = 'change';
    str = 'local str';
    console.log('obj--', obj, str);
  };
  const obj = {
    name: 'global',
  };
  const str = 'global str';
  console.log('obj--start--', obj, str);
  changeObj(obj, str);
  console.log('obj--end', obj, str);

  useEffect(() => {}, []);

  useReady(() => {
    console.log('测试canvas页面节点准备好了--');
    setTimeout(() => {
      createSelectorQuery()
        .select('#drawer')
        .fields({ node: true, size: true })
        .exec((res) => {
          // Canvas 对象

          console.log('查询回调--', res);
          const canvas = res[0].node;

          console.log('canvas对象--', canvas);
          // 渲染上下文
          let ctx = (canvasCtx.current = canvas.getContext('2d'));
          console.log('ctx--', ctx);
          if (!canvasCtx.current) return;

          // Canvas 画布的实际绘制宽高
          const width = res[0].width;
          const height = res[0].height;

          // 初始化画布大小
          const dpr = wx.getWindowInfo().pixelRatio;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          ctx.scale(dpr, dpr);

          // // 清空画布
          // ctx.clearRect(0, 0, width, height);

          // 绘制红色正方形
          // ctx.fillStyle = 'rgb(200, 0, 0)';
          // ctx.fillRect(10, 10, 50, 50);

          // 绘制蓝色半透明正方形
          // ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
          // ctx.fillRect(30, 30, 50, 50);

          // 图片对象
          const image2 = canvas.createImage();

          // 图片加载完成回调
          image2.onload = () => {
            // 将图片绘制到 canvas 上

            const res = getSystemInfoSync();

            ctx.drawImage(image2, 0, 0, res.windowWidth, res.windowHeight);

            // 图片对象
            const image1 = canvas.createImage();

            // 图片加载完成回调
            image1.onload = () => {
              // 将图片绘制到 canvas 上

              ctx.drawImage(image1, 100, 300, 100, 100);
            };

            image1.src = AvatarImg;
          };

          image2.src = BgImg;
        });
    }, 1000);
  });

  return (
    <View>
      <Canvas
        id='drawer'
        type='2d'
        style='border: 1px solid; width: 100vw; height: 100vh;'
      />
    </View>
  );
};

export default Index;
