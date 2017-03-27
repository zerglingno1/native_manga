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
  }
}