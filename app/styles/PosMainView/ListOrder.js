import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default styleSheet = () => {
  if (Platform.OS === 'windows') {
    return StyleSheet.create({
        watchControlContainer: {
            backgroundColor: 'transparent',
            flex: 1,
        },
        separator: {
            flex: 1,
            height: StyleSheet.hairlineWidth,
            backgroundColor: '#8E8E8E',
        },
        headerTitle: {
            marginLeft: 10,
            flex: 1,
            fontWeight: '500'
        },
        sectionHeaderText: {
            marginLeft: 10,
            color: '#ffffff',
            fontWeight: '400'
        },
        rowText : {
            marginLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        headPicker: {
            width: 150,
            height: 30,
            marginRight: 10,
        },
        listHeader: {
            height: 40,
            width: 800,
            flexDirection: 'row', 
            alignItems: 'center',
        },
        sectionHeader: {
            backgroundColor: '#777',
            width: Util.size.width,
            height: 30
        },
        rowView: {
            width: Util.size.width,
            height: 40
        }
    });
  }
}