import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default StyleSheet.create({
    watchControlContainer: {
        width: Util.size.width,
        height: 40,
        flexDirection:'row',
        backgroundColor: '#f3f3f3',
        paddingTop: 0, paddingLeft: 10, paddingRight: 30, paddingBottom: 0,
    },
    logoImage: {
        marginLeft: 80
    },
    btnBack: {
    },
    navBackBtn: {
        marginTop: 2,
        height: 45,
        width: 45,
        fontSize: 25,
        color: '#555',
    },
});