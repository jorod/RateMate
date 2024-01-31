import React from 'react';

import { Icon } from 'react-native-elements';

export default ({ enabled }) => (
  <Icon
    size={20}
    type="fontawesome"
    name="check"
    containerStyle={{
      paddingTop: 5,
      width: 30,
      height: 30,
      backgroundColor: enabled ? '#59E16F' : '#E6E7E8',
      borderRadius: 15,
    }}
    color="#717076"
  />
);
