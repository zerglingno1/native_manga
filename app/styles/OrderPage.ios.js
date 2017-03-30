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
    header: {
        width: 300,
        height: 60,
        backgroundColor: 'transparent',
        position: 'absolute',
        left: 20,
        top: 20,
    },
    productSearch: {
        width: 400,
    },
    bottomBtn: {
        width: 200,
        height: 40,
        position: 'absolute',
        bottom: 5,
        left: (Util.size.width / 2 - 480) / 2,
    },
    cartView: {
        width: 460,
        height: 500
    },
    cartTotal: {
        width: 460,
        height: 80,
        backgroundColor: '#ffffff',
        flexDirection: 'row', 
        padding: 10,
        marginBottom: 20
    },
    textbox: {
        flex: 1,
        fontSize: 20
    },
    textboxTotal: {
        fontWeight: '500',
        fontSize: 20
    },
    leftText: {
        flex: 1,
    },
    bottomCheckout: {
        width: 320,
        height: 40,
    },
    bottomBtnCustomer: {
        width: 200,
        height: 40,
        position: 'absolute',
        bottom: 5,
        right: (Util.size.width / 2 - 480) / 2,
    }
});