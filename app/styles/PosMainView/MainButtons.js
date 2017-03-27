import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default styleSheet = () => {
  if (Platform.OS === 'windows') {
    return StyleSheet.create({
        watchControlContainer: {
            flexDirection:'row',
            backgroundColor: 'transparent',
        },
        btn: {
            width: 120,
            height: 90,
            flex: 1,
            marginLeft: 6,
            marginRight: 6,
            marginBottom: 6,
            marginTop: 6,
        }
    });
  }
}