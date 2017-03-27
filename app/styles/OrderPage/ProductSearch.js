import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default styleSheet = () => {
  if (Platform.OS === 'windows') {
    return StyleSheet.create({
        watchControlContainer: {
            backgroundColor: 'transparent',
        },
        searchPanel: {
            width: 480,
            height: 80
        },
        productList: {
            marginTop: 10,
            width: 480,
            height: 560
        },
    });
  } else if (Platform.OS === 'ios') {
      return StyleSheet.create({
        watchControlContainer: {
            backgroundColor: 'transparent',
        },
        searchPanel: {
            width: 400,
            height: 80
        },
        productList: {
            marginTop: 10,
            width: 400,
            height: 440
        },
    });
  }
}