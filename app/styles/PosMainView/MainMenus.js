import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default styleSheet = () => {
  if (Platform.OS === 'windows') {
    return StyleSheet.create({
        watchControlContainer: {
            backgroundColor: 'transparent',
        },
        btn: {
            width: 90,
            height: 90,
            marginLeft: 3,
            marginRight: 3,
            marginBottom: 3,
            marginTop: 3,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        navigatorRight: {
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            width: 10,
            height: 10,
            marginLeft: 11
        },
        navigatorLeft: {
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            width: 10,
            height: 10,
            marginRight: 11
        },
        imgBtn: {
            width: 85,
            height: 85,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        }
    });
  }
}