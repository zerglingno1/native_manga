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
    const { title, navigator, index } = this.props;
    
    let totalView = this.totalMount();
    return(
      <Image
        style={styles.mainView}
        source={require('../assets/images/bg_all.png')}>
        <View style={styles.leftView}>
          <HeaderPage 
            navigator={navigator} 
            index={index}
            cStyles={styles.header}  />
          <ProductSearch 
            cStyles={styles.productSearch} 
            products={productShow}
            onGoBack={() => this._onGoBack()}
            chooseProduct={(item) => this._chooseProduct(item)}/>
          <ImageButton
            style={ styles.bottomBtn }
            appearance={ {
                normal: require('../assets/button/btn_blue_bottom.png'),
                highlight: require('../assets/button/btn_tenkey_g.png')
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
            appearance={ {
                normal: require('../assets/button/btn_orange_long.png'),
                highlight: require('../assets/button/btn_tenkey_g.png')
            } }
            title={'Thanh toán'}/>
            <ImageButton
            style={ styles.bottomBtnCustomer }
            appearance={ {
                normal: require('../assets/button/btn_blue_bottom.png'),
                highlight: require('../assets/button/btn_tenkey_g.png')
            } }
            title={'Customer'}
            onPress={() => {}}/>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    width: Util.size.width,
    height: Util.size.height,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
  },
  leftView: {
    width: Util.size.width * 23 / 48, // left = 23/48 all width
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
    width: Util.percentToPixel(25, Util.size.width),
    height: 60,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 40,
    top: 50,
  },
  productSearch: {
    width: Util.percentToPixel(25, Util.size.width)
  },
  bottomBtn: {
    width: 200,
    height: 40,
    position: 'absolute',
    bottom: 5,
    left: ((Util.size.width / 2)  - Util.percentToPixel(30, Util.size.width)) / 2 
  },
  cartView: {
    width: Util.percentToPixel(25, Util.size.width),
    height: Util.percentToPixel(60, Util.size.height)
  },
  cartTotal: {
    width: Util.percentToPixel(25, Util.size.width),
    height: Util.percentToPixel(12, Util.size.height),
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
    right: ((Util.size.width / 2)  - Util.percentToPixel(30, Util.size.width)) / 2 ,
  }
});
