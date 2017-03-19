'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View } from 'react-native';
import Util from '../../utils/utils';

export default class WatchControl extends Component{
  static propTypes = {
    stopWatch: React.PropTypes.func.isRequired,
    clearRecord: React.PropTypes.func.isRequired,
    startWatch: React.PropTypes.func.isRequired,
    addRecord: React.PropTypes.func.isRequired,
  }; 

  constructor(props){
    super(props);
    this.state = {
      watchOn: false, 
      startBtnText: 'START',
      startBtnColor: '#60B644',
      stopBtnText: 'STOP',
      underlayColor:'#fff',
    };
  }

  _startWatch() {
    if (!this.state.watchOn) {
      this.props.startWatch()
      this.setState({
        startBtnText: 'START',
        startBtnColor: '#ff0044',
        stopBtnText: 'STOP',
        underlayColor:'#eee',
        watchOn: true
      })
    } else {
      this.props.stopWatch()
      this.setState({
        startBtnText: 'START',
        startBtnColor: '#60B644',
        stopBtnText: 'STOP',
        underlayColor: '#eee',
        watchOn: false
      })
    } 
  }

  _addRecord() {
    if (this.state.watchOn) {
      this.props.addRecord();
    } else {
      this.props.clearRecord()
      this.setState({
        stopBtnText: 'START'
      });
    }
  }

  render() {
    return(
      <View style={styles.watchControlContainer}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <TouchableHighlight style={styles.btnStop} underlayColor={this.state.underlayColor} onPress={()=>this._addRecord()}>
            <Text style={styles.btnStopText}>{this.state.stopBtnText}</Text>
          </TouchableHighlight>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableHighlight style={styles.btnStart} underlayColor='#eee' onPress={()=> this._startWatch()}>
              <Text style={[styles.btnStartText,{color: this.state.startBtnColor}]}>{this.state.startBtnText}</Text>
            </TouchableHighlight>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    width: Util.size.width,
    height: 100,
    flexDirection:'row',
    backgroundColor: '#f3f3f3',
    paddingTop: 30, paddingLeft: 60, paddingRight: 60, paddingBottom: 0,
  },
  btnStart: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStop: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnStartText: {
    fontSize: 14,
    backgroundColor: 'transparent'
  },
  btnStopText: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#555'
  }
});