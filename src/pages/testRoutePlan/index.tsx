import React, { useState } from 'react';

import { View, Input, Map } from '@tarojs/components';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

// navigateTo, requirePlugin
import {
  getLocation,
  request,
  useDidShow,
  showLoading,
  hideLoading,
} from '@tarojs/taro';

import './index.scss';

// const chooseLocation = requirePlugin('chooseLocation');

const key = 'JB2BZ-RNV6Q-KMM5N-GIEH7-7Q4O5-IEF4P';

// const referer = '小岛咖啡';

// const location = JSON.stringify({
//   latitude: 39.89631551,
//   longitude: 116.323459711,
// });

// const category = '生活服务,娱乐休闲';

// const onClick=() => {
//   navigateTo({
//     url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`,
//   });
// }

const Index = () => {
  const [isSearchBarFocus, setIsSearchBarFocus] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const [polylineConfig, setPolylineConfig] = useState<
    {
      points: any[];
      color: string;
      width: number;
      dottedLine: boolean;
    }[]
  >([]);

  // 用户当前实时位置
  const [currLocation, setCurrLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const testRoutePlan = () => {
    // https://apis.map.qq.com/ws/direction/v1/walking/?from=39.984042,116.307535&to=39.976249,116.316569&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77
    // 目标地点--上海体育场（挑选门店时，自行换成对应的门店经纬度）
    const newDestination = {
      latitude: 31.18334,
      longitude: 121.43348,
    };

    //  https://apis.map.qq.com

    // 获取路径规划
    showLoading();
    request({
      url: `https://apis.map.qq.com/ws/direction/v1/walking/?from=${currLocation.latitude},${currLocation.longitude}&to=${newDestination.latitude},${newDestination.longitude}&key=${key}`,
      success: (res: any) => {
        console.log('路径规划--', res.data.result);
        const routePlan = res.data.result.routes?.[0];
        const coors: any[] = routePlan.polyline;
        // polyline为数值型一维数组，格式为：
        // [坐标1纬度 , 坐标1经度 , 坐标2纬度 , 坐标2经度 , 坐标3纬度 , 坐标3经度…]，
        // 第一个坐标为原始未被压缩过的，之后的使用前向差分进行压缩，解压方法如下：
        for (let i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000;
        }
        // 划线
        const points: any[] = [];
        for (let i = 0; i < coors.length; i = i + 2) {
          points[i / 2] = {
            latitude: coors[i],
            longitude: coors[i + 1],
          };
        }
        console.log('路线点--', points);

        // 设置polyline设置新值，就会在地图上画出路线图了
        const newConfig = [
          {
            points: points,
            color: '#00ae20',
            width: 4,
            dottedLine: false,
          },
        ];

        setPolylineConfig(newConfig);
        hideLoading();
      },
    });
  };

  useDidShow(() => {
    // 页面加载后，获取用户当前实时位置
    getLocation({
      type: 'wgs84',
      success: function (res) {
        const currLatitude = res.latitude;
        const currLongitude = res.longitude;

        console.log('当前用户经纬度--', currLatitude, currLongitude);
        setCurrLocation({
          latitude: currLatitude,
          longitude: currLongitude,
        });
      },
    });
  });

  console.log('polyline---', polylineConfig);

  return (
    <RecoilRoot>
      <View className='test-map'>
        {/*搜索区域 */}
        <View className='search-bar'>
          <View className='left'>上海市</View>
          <View className='right'>
            {isSearchBarFocus ? (
              <Input
                type='text'
                className='focus-input'
                focus
                onInput={(e) => {
                  const searchKey = e.detail.value?.trim() || '';
                  if (!searchKey) return;
                  setSearchKey(searchKey);
                }}
              />
            ) : (
              <View className='blur' onClick={() => setIsSearchBarFocus(true)}>
                搜索门店
              </View>
            )}
          </View>
        </View>
        {/*搜索结果展示区域 */}
        <View
          className='search-content'
          onClick={() => setIsSearchBarFocus(false)}
        >
          <Map
            id='map'
            style='width: 100%; height: 300px;'
            longitude={currLocation.longitude}
            latitude={currLocation.latitude}
            scale={14}
            // markers={markers}
            polyline={polylineConfig}
            show-location='true'
            onRegionChange={(e) => {
              console.log('regionChange--', e);
            }}
            onMarkerTap={(e) => {
              console.log('markerTap--', e);
            }}
          />
          <View className='test-btn' onClick={testRoutePlan}>
            测试路径，从当前位置导航到上海体育场
          </View>
        </View>
      </View>
    </RecoilRoot>
  );
};

export default Index;
