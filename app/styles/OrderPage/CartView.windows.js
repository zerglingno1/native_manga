import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default StyleSheet.create({
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
    rowText : {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    headPicker: {
        width: 150,
        height: 30,
        marginRight: 10,
    },
    listHeader: {
        height: 40,
        width: 480,
        flexDirection: 'row', 
        alignItems: 'center',
    },
    rowView: {
        width: 480,
        height: 100,
        paddingTop: 10, paddingLeft: 10, paddingRight: 10
    },
    bottomBtn: {
        width: 40,
        height: 40,
    },
    discountBtn: {
        width: 60,
        height: 40,
    },
});