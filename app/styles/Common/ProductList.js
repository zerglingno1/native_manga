import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default styleSheet = () => {
  if (Platform.OS === 'windows') {
    return StyleSheet.create({
        watchControlContainer: {
            backgroundColor: '#f3f3f3',
        },
        recordList: {
            paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
        },
        recordListContainer: {
            flexDirection: 'column',
            flexWrap: 'wrap'
        },
        recordItem: {
            height: 100,
            width: 225,
            backgroundColor: '#f3f3f3',
            marginTop: 5, marginLeft: 5, marginRight: 15, marginBottom: 5,
            borderRadius: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#bbb',
        },
        recordItemTitle:{
            backgroundColor: 'transparent',
        },
        listHeader: {
            width: 480,
            height: 30,
            marginRight: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
            flexDirection: 'row',
        },
        headerTitle: {
            marginRight: 10,
            width: 60,
            height: 30,
        },
        headerBorder: {
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: '#bbb',
        },
        listTitle: {
            width: 480,
            marginTop: 15,
            marginLeft: 10,
            marginBottom: 15
        }
    });
  } else if (Platform.OS === 'ios') {
      return StyleSheet.create({
        watchControlContainer: {
            backgroundColor: '#f3f3f3',
        },
        recordList: {
            paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
        },
        recordListContainer: {
            flexDirection: 'column',
            flexWrap: 'wrap'
        },
        recordItem: {
            height: 100,
            width: 225,
            backgroundColor: '#f3f3f3',
            marginTop: 5, marginLeft: 5, marginRight: 15, marginBottom: 5,
            borderRadius: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: '#bbb',
        },
        recordItemTitle:{
            backgroundColor: 'transparent',
        },
        listHeader: {
            width: 400,
            height: 30,
            marginRight: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#bbb',
            flexDirection: 'row',
        },
        headerTitle: {
            paddingLeft: 10,
            width: 60,
            height: 30,
        },
        headerBorder: {
            flex: 1,
            borderRightWidth: 1,
            borderRightColor: '#bbb',
        },
        listTitle: {
            width: 400,
            marginTop: 15,
            marginLeft: 10,
            marginBottom: 15
        }
    });
  }
}