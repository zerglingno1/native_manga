'use strict';

import React, { Component } from 'react';
import { 
  Image, 
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  LayoutAnimation,
  TouchableHighlight,
  AsyncStorage,
  View } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ReminderContainer extends Component{
  static defaultProps = {
    listData: {
      title: 'Reminder',
      theme: '#fe952b',
      list: []
    },
  };

  static propTypes = {
    listData: React.PropTypes.object,
    switch: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      listData: this.props.listData,
      chars: ''
    }
  }

  saveStorage(listData) {
    AsyncStorage.setItem('@TODOS', JSON.stringify(listData), (err) => {
      this.setState({
        listData,
      });
    });
  }

  getStorage() {
    AsyncStorage.getItem('@TODOS', (err, stores) => {
      if(!stores) {
        this.setState({
          listData: {
            title: 'Reminder',
            theme: '#fe952b',
            list: []
          },
        });
      } else {
        this.setState({
          listData: JSON.parse(stores),
        });
      }
    });
  }

  _done(index) {
    const { listData } = this.state;

    listData.list[index].selected = !listData.list[index].selected;
    
    this.saveStorage(listData);

    LayoutAnimation.easeInEaseOut();
  }

  _addList(text) {
    const { listData } = this.state;

    if(text) {
      listData.list.push({
        selected: false,
        text
      });
      this.saveStorage(listData);
      this.refs.addList.setNativeProps({text: ''});
    }
    
    LayoutAnimation.easeInEaseOut();
  }
  
  _wordChange(text) {
    let { chars } = this.state;
    if (text.length == 1) {
      // The scanner is likely to input characters much quicker than a user can (sensibly) with a keyboard
      setTimeout(() => {
        const { chars, listData } = this.state;
        // check we have a long length e.g. it is a barcode
        if (chars.length >= 9) {
          listData.list.push({
            selected: false,
            text: chars
          })
          //remove add textbox
          this.saveStorage(listData);
          this.refs.addList.setNativeProps({text: ''});
          this.setState({
            chars: '',
          });

          LayoutAnimation.easeInEaseOut();
        } else {
          this.setState({
            chars: '',
          });
        }
      }, 800);
    }
    
    this.setState({
      chars: text
    });
  }

  componentWillMount() {
    this.getStorage();
  }

  render() {
    const { listData } = this.state;
    
    //count exist task
    let count = 0;
    let list = listData.list.map((item, index) => {
      if(!item.selected) {
        count++;
      }
      return (
        <View ref={'list' + index} key={index} style={[styles.reminderList, {opacity: item.selected ? 0.5 : 1}]}>
          <TouchableHighlight 
            underlayColor='transparent' 
            style={[styles.check, {borderColor: item.selected ? listData.theme: '#c6c6c6'}]} 
            onPress = {() => this._done(index)}>
            <View style={item.selected ? [styles.fill, {backgroundColor: listData.theme}]: null}></View>
          </TouchableHighlight>
          <View style={styles.input}>
            <TextInput defaultValue={item.text} style={styles.inputText} editable={ !item.selected ? true : false}/>
          </View>
        </View>
      );
    })

    //add add-form in the end of reminder list
    list.push(
      <View key='add' style={styles.reminderList}>
        <View style={styles.add}>
          <Icon name='ios-add-circle-outline' style={styles.addIcon} color='#c6c6c6' size={22}/>
        </View>
        <View style={styles.input}>
          <TextInput 
          autoCapitalize='none' 
          ref='addList'
          placeholder='type your todo'
          onEndEditing={(event) => this._addList(event.nativeEvent.text)} 
          onChangeText={(text) => this._wordChange(text) }
          onSubmitEditing={(event) => this._addList(event.nativeEvent.text)}
          style={styles.inputText}/>
        </View>
      </View>
    );

    return(
      <View style={[styles.reminderContainer,this.props.listStyle]}>
        <View style={styles.reminderContent}>
          <TouchableHighlight underlayColor='transparent' onPress={this.props.switch}>
            <View style={styles.reminderTitleContainer}>
              <Text style={[styles.reminderTitle, {color: listData.theme}]}>{listData.title}</Text>
              <Text style={[styles.reminderTitle, {color: listData.theme}]}>
                <Icon name='ios-archive' style={styles.addIcon} color='#c6c6c6' size={35}/>
                {count}
              </Text>
            </View>
          </TouchableHighlight>
          <View style={styles.reminderListContainer}>
            {list}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reminderContainer: {
    height: Util.size.height-65,
    width: Util.size.width,
    borderRadius: 10,
    position: 'absolute',
    top: 20,
    left: 0,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: -1,
      width: 0,
    },
    marginTop: 60,
  },
  reminderBg: {
    height: Util.size.height-65,
    width: Util.size.width,
    borderRadius: 10,
    resizeMode: 'cover',
    opacity: 0.5,
  },
  reminderContent: {
    height: Util.size.height-65,
    width: Util.size.width,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  reminderTitleContainer: {
    height: 65,
    width: Util.size.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  },
  reminderTitle: {
    fontSize: 28,
    fontWeight: '300',
    textShadowColor: '#ccc',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 1,
  },
  reminderListContainer: {
    flex: 1,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  reminderList: {
    flexDirection: 'row',
    paddingLeft: 15,
    height: 45,
    width: Util.size.width,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  check: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#c6c6c6',
    width: 22,
    height: 22,
    borderRadius: 11,
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowRadius: 1,
    shadowColor: '#aaa',
    shadowOpacity: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fill: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  input: {
    width: Util.size.width-50,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputText: {
    height: 43,
    color: '#363636',
  },
  reminderText: {
    height: 43,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addIcon: {
    paddingLeft: 5
  }
});