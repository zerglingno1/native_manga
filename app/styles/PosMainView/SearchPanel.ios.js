import { Platform, StyleSheet } from 'react-native';
import Util from '../../utils/utils';

export default StyleSheet.create({
    watchControlContainer: {
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        marginLeft: 20,
    },
    btn: {
        width: 60,
        height: 40,
        marginLeft: 10,
        marginRight: 20,
        marginBottom: 5,
        marginTop: 5
    }
});