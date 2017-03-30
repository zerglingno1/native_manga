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
        paddingLeft: 10,
        flex: 1,
        fontWeight: '500'
    },
    sectionHeaderText: {
        paddingLeft: 10,
        color: '#ffffff',
        fontWeight: '400',
        width: 450,
        height: 30,
    },
    rowText : {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headPicker: {
        width: 150,
        height: 30,
        paddingRight: 10,
    },
    listHeader: {
        height: 40,
        width: 450,
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