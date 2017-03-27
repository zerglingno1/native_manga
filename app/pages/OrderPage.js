import React, { Component } from 'react';
import { 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View,
  ScrollView,
  Image,
  TextInput } from 'react-native';
import Util from '../utils/utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderPage from '../components/Common/HeaderPage';
import ProductSearch from '../components/OrderPage/ProductSearch';
import CartView from '../components/OrderPage/CartView';
import ImageButton from '../components/Common/ImageButton';

import styleSheet from '../styles/OrderPage';

export default class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      carts: [],
      products: [{
        name: 'Category 1',
        type: 1,
        products: [
          {
            name: 'Product 1',
            type: 0,
            price: 300,
            id: 3,
          }, {
            name: 'Product 1',
            type: 0,
            price: 1200,
            id: 4,
          }, {
            name: 'Product 1',
            type: 0,
            price: 1000,
            id: 5,
          }, 
        ]
      }, {
        name: 'Category 2',
        type: 1,
        products: [
          {
            name: 'Category 3',
            type: 1,
            products: [{
                name: 'Product 5',
                type: 0,
                price: 1000,
                id: 8,
              }]
          },
          {
            name: 'Product 4',
            type: 0,
            price: 1000,
            id: 7,
          }
        ]
      }, {
        name: 'Product 1',
        type: 0,
        price: 1000,
        id: 8,
      }, {
        name: 'Product 2',
        type: 0,
        price: 200,
        id: 9,
      }, {
        name: 'Product 3',
        type: 0,
        price: 500,
        id: 10,
      }, {
        name: 'Product 4',
        type: 0,
        price: 900,
        id: 11,
      }, {
        name: 'Product 5',
        type: 0,
        price: 200,
        id: 12,
      }, {
        name: 'Product 6',
        type: 0,
        price: 1000,
        id: 13,
      }, {
        name: 'Product 7',
        type: 0,
        price: 1000,
        id: 14,
      }, {
        name: 'Product 8',
        type: 0,
        price: 200,
        id: 15,
      }, {
        name: 'Product 9',
        type: 0,
        price: 500,
        id: 16,
      }, {
        name: 'Product 10',
        type: 0,
        price: 900,
        id: 17,
      }, {
        name: 'Product 12',
        type: 0,
        price: 200,
        id: 18,
      }, {
        name: 'Product 31',
        type: 0,
        price: 1000,
        id: 19,
      }],
      productShow: null
    }
  }

  componentWillMount() {
    const { products } = this.state;

    this.setState({
      productShow: products
    });
  }

  _goToPage(index) {
    const { menus } = this.state;
    const { navigator } = this.props;

    navigator.push({
      title: menus[index].title,
      index: index + 1,
      display: !menus[index].hideNav,
      component: menus[index].component,
      data: (menus[index].data) ? menus[index].data : {}
    })
  }

  totalMount() {
    const { carts } = this.state;

    let total = 0;
    let quantity = 0;
    carts.map((item)=> {
      total += item.quantity * item.price;
      quantity += item.quantity;
    });

    return { total, quantity };
  }

  _chooseProduct(cart) {
    let { carts } = this.state;

    if(cart.type == 0) {
      let isHave = false;
      carts = carts.map((item)=> {
        if(item.id == cart.id) {
          item.quantity++;
          isHave = true;
        }
        return item;
      });
      if(!isHave) {
        cart.quantity = 1;
        carts.push(cart);
      }

      this.setState({
        carts
      });
    } else {
      this.setState({
        productShow: cart.products
      });
    }
  }

  _onPressControllButton(cart, type) {
    let { carts } = this.state;

    switch(type) {
      case 'add': 
        carts = carts.map((item)=> {
          if(item.id == cart.id) {
            item.quantity++;
            isHave = true;
          }
          return item;
        });
        this.setState({
          carts
        });
      break;
      case 'minus':
      let tempCart = [];
        carts.forEach((item)=> {
          if(item.id == cart.id) {
            item.quantity--;
            isHave = true;
          }
          if (item.quantity > 0) {
            tempCart.push(item);
          }
          
        });
        this.setState({
          carts: tempCart
        });
      break;
    }
  }

  _onGoBack() {
    const { products } = this.state;

    this.setState({
      productShow: products
    });
  }

  render() {
    const { menus, search, carts, productShow } = this.state;
    const { title, navigator, index, _goBack, _handleNavigate } = this.props;
    
    let totalView = this.totalMount();
    return(
      <Image
        style={styles.mainView}
        source={require('../../public/images/bg_all.png')}>
        <View style={styles.leftView}>
          <HeaderPage 
            navigator={navigator} 
            index={index}
            cStyles={styles.header}
            _goBack={_goBack} />
          <ProductSearch 
            cStyles={styles.productSearch} 
            products={productShow}
            onGoBack={() => this._onGoBack()}
            chooseProduct={(item) => this._chooseProduct(item)}/>
          <ImageButton
            style={ styles.bottomBtn }
            appearance={ {
                normal: require('../../public/button/btn_blue_bottom.png'),
                highlight: require('../../public/button/btn_tenkey_g.png')
            } }
            title={'Nút gì đó'}
            onPress={() => {}}/>
        </View>
        <View style={styles.rightView}>
          <CartView 
            cStyles={styles.cartView}
            onPressButton={(cart, type) => {this._onPressControllButton(cart, type);}}
            carts={carts}/>
            <View style={styles.cartTotal}>
              <View style={styles.leftText}>
                <Text style={styles.textbox} >{ `Total amount: ${totalView.total}` }</Text>
                <Text style={styles.textbox} >{ `Total quantity: ${totalView.quantity}` }</Text>
              </View>
              <Text style={styles.textboxTotal} >{ ` ${totalView.total} yen` }</Text>
            </View>
            <ImageButton
            style={ styles.bottomCheckout }
            onPress={
              () => {
                _handleNavigate({
                  type: 'push',
                  route: {
                    key: 'reminder'
                  }
                });
              }
            }
            appearance={ {
                normal: require('../../public/button/btn_orange_long.png'),
                highlight: require('../../public/button/btn_tenkey_g.png')
            } }
            title={'Thanh toán'}/>
            <ImageButton
            style={ styles.bottomBtnCustomer }
            appearance={ {
                normal: require('../../public/button/btn_blue_bottom.png'),
                highlight: require('../../public/button/btn_tenkey_g.png')
            } }
            title={'Customer'}
            onPress={() => {}}/>
        </View>
      </Image>
    );
  }
}

const styles = styleSheet();
