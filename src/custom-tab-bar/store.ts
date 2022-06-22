import { makeAutoObservable } from 'mobx';
import _ from 'lodash';

import ActiveHome from '../tabBarIcon/active-home.png';
import UnActiveHome from '../tabBarIcon/inactive-home.png';

import ActiveOrder from '../tabBarIcon/active-order.png';
import UnActiveOrder from '../tabBarIcon/inactive-order.png';

import ActivePractice from '../tabBarIcon/active-practice.png';
import UnActivePractice from '../tabBarIcon/inactive-practice.png';

import ActiveUser from '../tabBarIcon/active-user.png';
import UnActiveUser from '../tabBarIcon/inactive-user.png';

const NORMAL_LIST = [
  {
    pagePath: '/pages/tabPages/index/index',
    text: '首页',
    selectedIconPath: ActiveHome,
    iconPath: UnActiveHome,
  },
  {
    pagePath: '/pages/tabPages/order/index',
    text: '订单',
    selectedIconPath: ActiveOrder,
    iconPath: UnActiveOrder,
  },
  {
    pagePath: '/pages/tabPages/practice/index',
    text: '练习',
    selectedIconPath: ActivePractice,
    iconPath: UnActivePractice,
  },
  {
    pagePath: '/pages/tabPages/user/index',
    text: '用户',
    selectedIconPath: ActiveUser,
    iconPath: UnActiveUser,
  },
]; // 自行补充

class TabBar {
  selectedPath = NORMAL_LIST[0].pagePath; // 默认选中
  list = NORMAL_LIST;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  setSelected(selectedPath: string): void {
    this.selectedPath = selectedPath;
  }

  // 监听 selectedPath 的变化，检索配置，获取对应下标，这里主要是为了做好动态路由的切换
  get selected(): number {
    return _.findIndex(this.list, { pagePath: this.selectedPath });
  }

  changeTabBar(v: 1 | 2): void {
    // 改变list，显示不同的 tabBar
    this.list = [];
  }
}

export default new TabBar();
