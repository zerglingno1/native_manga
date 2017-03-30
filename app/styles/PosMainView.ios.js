import { Platform, StyleSheet } from 'react-native';
import Util from '../utils/utils';

export default StyleSheet.create({
    mainView: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: .3,
        shadowRadius: 1.3,
    },
    leftView: {
        flex: 1,
        width: Util.size.width / 2,
        height: Util.size.height,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightView: {
        flex: 1,
        width: Util.size.width / 2,
        height: Util.size.height,
        backgroundColor:'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoImage: {
    },
    startText: {
        flexWrap: 'wrap',
        width: 300,
        maxHeight: 100,
        marginTop: 40
    },
    mainButtons: {
        width: 400,
        height: 110,
        marginTop: 40
    },
    mainSearch: {
        width: 400,
        height: 100,
        marginTop: 0
    },
    mainMenus: {
        width: 400,
        height: 140,
        marginTop: 10,
        flexDirection: 'row', 
        justifyContent: 'center',
        alignItems: 'center',
    },
    ListOrder: {
        width: 450,
        height: 600,
        flexDirection: 'row', 
    },

});