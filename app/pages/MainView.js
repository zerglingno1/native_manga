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
import ListManga from './ListManga';
import BookMarksManga from './BookMarksManga';
import SearchManga from './SearchManga';
import HotManga from './HotManga';
import CategoryManga from './CategoryManga';
import SavedManga from './SavedManga';
import Reminder from './Reminder';
import WebViewPage from './WebViewPage';

export default class MainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [{
        key: 0,
        title: 'DANH SÁCH TRUYỆN',
        component: ListManga,
        icon: 'book-open-page-variant',
        size: 100,
        color: '#ff856c',
        hideNav: true,
      }, {
        key: 1,
        title: 'YÊU THÍCH',
        component: BookMarksManga,
        icon: 'book-multiple',
        size: 100,
        color: '#ff856c',
        hideNav: true,
      }, {
        key: 2,
        title: 'TRUYỆN HOT',
        component: HotManga,
        icon: 'fire',
        size: 100,
        color: '#ff856c',
        hideNav: true,
      }, {
        key: 3,
        title: 'TRUYỆN MỚI',
        component: HotManga,
        icon: 'newspaper',
        size: 100,
        color: '#ff856c',
        hideNav: true,
        data: {type: '/truyen-moi-dang'}
      }, {
        key: 4,
        title: 'THỂ LOẠI',
        component: CategoryManga,
        icon: 'format-list-bulleted',
        size: 100,
        color: '#ff856c',
        hideNav: true,
        data: {type: '/truyen-moi-dang'}
      }, {
        key: 5,
        title: 'ĐÃ LƯU',
        component: SavedManga,
        icon: 'folder',
        size: 100,
        color: '#ff856c',
        hideNav: true,
      }, {
        key: 6,
        title: 'GHI NHỚ',
        component: Reminder,
        icon: 'message-bulleted',
        size: 100,
        color: '#ff856c',
        hideNav: true,
      }, {
        key: 7,
        title: 'TRÌNH DUYỆT WEB',
        component: WebViewPage,
        icon: 'web',
        size: 100,
        color: '#ff856c',
        hideNav: true,
      }],
      search: ''
    }
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

  _searchManga() {
    const { navigator, index } = this.props;
    const { search } = this.state;
    navigator.push({
      title: `TÌM KIẾM ${search}`,
      index: index + 1,
      display: false,
      component: SearchManga,
      data: search
    })
  }

  _handleSearchChange = (event) => {
    let search = event.nativeEvent.text;
    this.setState({
        search
      });
  };

  render() {
    const { menus, search } = this.state;
    const { title } = this.props;
    let boxs = menus.map((item, index) => {
      return(
        <TouchableOpacity key={item.key} style={[styles.touchBox, styles.touchBox1]} onPress={()=> this._goToPage(index)}>
          <View style={styles.boxContainer}>
            <Text style={styles.boxText}> {item.title} </Text>
              <Icon size={item.size} name={item.icon} style={[styles.boxIcon,{color: item.color}]}></Icon>
          </View>
        </TouchableOpacity>
      );
    });
    return(
      <ScrollView style={styles.mainView} title={title}>
        <View style={styles.faceContainer}>
          <TextInput placeholder='TÌM KIẾM' onSubmitEditing={() => this._searchManga()} onChange={this._handleSearchChange} style={styles.inputText}/>
          <TouchableOpacity style={styles.btnStyle} onPress={() => this._searchManga() }>
            <Icon name='magnify' color='#60B644' size={32}/>
          </TouchableOpacity>
        </View>
        <View style={styles.touchBoxContainer}>
          {boxs}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: 65
  },
  touchBox: {
    width: (Util.size.width > 700) ? (Util.size.width - 10 - 4 * 15) / 4 : (Util.size.width - 10 - 3 * 10) / 3.01333,
    height: (Util.size.width > 700) ? (Util.size.width - 10 - 4 * 15) / 4 : (Util.size.width - 10 - 3*10) / 3.01333,
    backgroundColor: '#f3f3f3',
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5
  },
  touchBox1: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#777',
    borderRightWidth: Util.pixel,
    borderRightColor: '#777',
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (Util.size.width > 700) ? (Util.size.width - 10 - 4 * 15) / 4 : (Util.size.width - 10 - 3*10) / 3.01333,
    height: (Util.size.width > 700) ? (Util.size.width - 10 - 4 * 15) / 4 : (Util.size.width - 10 - 3*10) / 3.01333,
  },
  boxText: {
    position: 'absolute',
    bottom: 15,
    width: (Util.size.width > 700) ? (Util.size.width - 10 - 4 * 15) / 4 : (Util.size.width - 10 - 3*10) / 3.01333,
    textAlign: 'center',
    left: 0,
    backgroundColor: 'transparent'
  },
  boxIcon: {
    position: 'relative',
    top: -10
  },
  touchBoxContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    width: Util.size.width,
    borderLeftWidth: Util.pixel,
    borderLeftColor: '#ccc',
    borderRightWidth: Util.pixel,
    borderRightColor: '#ccc',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  btnStyle: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceContainer: {
    width: Util.size.width,
    paddingLeft: 30, paddingRight:30,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    height: 50,
    flexDirection: 'row'
  },
  inputText: {
    marginLeft: 10,
    height: 40,
    width: Util.size.width - 120 - 40,
    color: '#363636',
  },
});
