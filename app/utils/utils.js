// obtained from react native tutorials

import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';

//get windows size
const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  percentToPixel: (percent, total) => {
    return (percent * total) / 100;
  }
};

//Style Windows 


export default Util;