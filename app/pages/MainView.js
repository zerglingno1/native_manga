import React, { Component } from 'react';
import { 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  TextInput } from 'react-native';
import Util from '../utils/utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListManga from './ListManga';
import BookMarksManga from './BookMarksManga';
import SearchManga from './SearchManga';

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
        title: 'TRUYỆN YÊU THÍCH',
        component: BookMarksManga,
        icon: 'book-multiple',
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
    })
  }

  _searchManga() {
    const { navigator, index } = this.props;
    const { search } = this.state;
    navigator.push({
      title: `TÌM KIẾM ${search}`,
      index: index + 1,
      display: true,
      component: SearchManga,
      data: search
    })
  }

  handleSearchChange = (event) => {
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
          <TextInput placeholder='TÌM KIẾM' onChange={this.handleSearchChange} style={styles.inputText}/>
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
    width: Util.size.width/3.01333,
    height: Util.size.width/3.01333,
    backgroundColor: '#f3f3f3',
  },
  touchBox1: {
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#ccc',
    borderRightWidth: Util.pixel,
    borderRightColor: '#ccc',
  },
  boxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Util.size.width/3.01333,
    height: Util.size.width/3.01333,
  },
  boxText: {
    position: 'absolute',
    bottom: 15,
    width: Util.size.width/3,
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
