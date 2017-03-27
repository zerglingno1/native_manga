import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default styleSheet = () => {
  if (Platform.OS === 'windows') {
    return StyleSheet.create({
        watchControlContainer: {
            height: 200,
            backgroundColor: '#f3f3f3',
        },
        panel2: {
            flexDirection:'row',
            marginTop: 10
        },
        btnSearchIcon: {
            backgroundColor: '#ffffff',
            marginLeft: 30,
            height: 35,
            width: 30,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputText: {
            backgroundColor: '#ffffff',
            width: 240,
            height: 35,
        },
        btnBarcode: {
            width: 35,
            height: 35,
            marginLeft: 45
        },
        textSearch: {
            marginLeft: 25,
            marginTop: 10,
            fontWeight: '500'
        },
        btnSearch: {
            width: 60,
            height: 35,
            marginLeft: 10
        }
    });
  }
}