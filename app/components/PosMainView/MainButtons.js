'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View, TouchableOpacity } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/Common/ImageButton';
import OrderPage from '../../pages/OrderPage';
import WebViewPage from '../../pages/WebViewPage';
import Reminder from '../../pages/Reminder';

export default class MainButtons extends Component{

  constructor(props) {
    super(props);
    this.state = {
      buttons: [{
        title: 'Thanh toán',
        image: require('../../../public/button/btn_newaccount.png'),
        type: 'push',
        route: {
          key: 'order'
        }
      }, {
        title: 'Khách hàng',
        image: require('../../../public/button/btn_search_member.png'),
        type: 'push',
        route: {
          key: 'order'
        }
      }, {
        title: 'Hàng hóa',
        image: require('../../../public/button/btn_search_stock.png'),
        type: 'push',
        route: {
          key: 'webview'
        }
      }, {
        title: 'Đăng ký',
        image: require('../../../public/button/btn_temp_member_register.png'),
        type: 'push',
        route: {
          key: 'reminder'
        }
      }]
    };
  }

  render() {
    const { cStyles, onPressButton } = this.props;
    const { buttons } = this.state;

    let btns = buttons.map((btn) => {
        return (
          <ImageButton
            style={ styles.btn }
            appearance={ {
                normal: btn.image,
                highlight: require('../../../public/button/btn_tenkey_g.png')
            } }
            onPress={() => onPressButton(btn)}/>
        );
    });
    
    return(
      <View style={[styles.watchControlContainer, cStyles]}>
        {btns}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    flexDirection:'row',
    backgroundColor: 'transparent',
  },
  btn: {
    width: 120,
    height: 90,
    flex: 1,
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 6,
    marginTop: 6,
  }
});