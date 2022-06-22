import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { switchTab } from '@tarojs/taro';

import { CoverView, CoverImage } from '@tarojs/components';

import * as _ from 'lodash';

import appConfig from '../app.config';

import store from './store';

import './index.scss';

const NORMAL_COLOR = '#2c2c2c';
const SELECTED_COLOR = '#d81e06';

// 获取数组里的类型
type ArrayType<T> = T extends (infer P)[] ? P : never;

// 自动监听路由变化设置
const tabBarPaths = _.map(appConfig.tabBar.list, (v) => v.pagePath);

wx.onAppRoute((route) => {
  tabBarPaths.includes(route.path);
  store.setSelected(`/${route.path}`);
});

const CustomTabBar: FC = () => {
  const onSwitchTab = (item: ArrayType<typeof store.list>): void => {
    switchTab({ url: item.pagePath });
  };

  return (
    <CoverView className='tab-bar-container'>
      <CoverView className='tab-list'>
        {store.list.map((item, index) => {
          return (
            <CoverView
              className='tab'
              onClick={onSwitchTab.bind(this, item)}
              data-path={item.pagePath}
              key={item.text}
            >
              {/* 请使用 base64 格式，否则会存在性能问题 */}
              <CoverImage
                className='tab-icon'
                src={
                  store.selected === index
                    ? item.selectedIconPath
                    : item.iconPath
                }
              />
              <CoverView
                className='tab-text'
                style={{
                  color:
                    store.selected === index ? SELECTED_COLOR : NORMAL_COLOR,
                }}
              >
                {item.text + '自定义'}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
      <CoverView className='tab-center-icon'></CoverView>
    </CoverView>
  );
};

export default observer(CustomTabBar);
