import React from 'react';

import { View } from '@tarojs/components';

import styles from './index.module.scss';

const Modal: React.FC<{
  visible: boolean;
  children: React.ReactNode;
}> = ({ visible, children }) => {
  if (!visible) return null;
  return <View className={styles.fullMask}>{children}</View>;
};

export default Modal;
