import { useState, useEffect } from 'react';

import { useDidShow, useDidHide } from '@tarojs/taro';

export default function useUsers(id: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('组件可见了');
  }, []);

  useDidShow(() => {
    console.log('useTest页面可见了', id);
  });

  useDidHide(() => {
    console.log('useTest页面不可见了', id);
  });

  return {
    count,
    setCount,
  };
}
