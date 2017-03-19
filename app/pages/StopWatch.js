'use strict';

import React,{ Component } from 'react';
import { Platform,ListView,StyleSheet,StatusBar,Text,TouchableHighlight,View } from 'react-native';
import Util from '../utils/utils';
import WatchFace from '../components/StopWatch/WatchFace';
import WatchRecord from '../components/StopWatch/WatchRecord';
import WatchControl from '../components/StopWatch/WatchControl';

export default class extends Component{
  constructor() {
    super();
    this.state = {
      stopWatch: false,
      totalTime: '00:00.00',
      sectionTime: '00:00.00',
      recordCounter: 0,
      interval: null,
      record:[
        {title: '',time: ''},
      ],
    };

    Date.prototype.fullDate = function() {
      let mm = this.getMonth() + 1;
      let dd = this.getDate();
      
      return [(dd > 9 ? '' : '0') + dd,
              (mm > 9 ? '' : '0') + mm,
              this.getFullYear()
            ].join('-');
    };
    Date.prototype.fullTime = function() {
      let h = this.getHours();
      let m = this.getMinutes();
      let s = this.getSeconds();
      
      return [(h > 9 ? '' : '0') + h,
              (m > 9 ? '' : '0') + m,
              (s > 9 ? '' : '0') + s].join(':');
    };
  }

  componentWillUnmount() {
    this._stopWatch();
    this._clearTime();
  }

  _startWatch() {
    const { stopWatch, interval } = this.state;

    if (interval == null) {
      let interval = setInterval(
        () => {
          let milSecond, second, minute, countingTime, secmilSecond, secsecond, secminute, seccountingTime;
          let current = (new Date());

          this.setState({
            totalTime: current.fullTime(),
            sectionTime: current.fullDate()
          });
        }, 1000);
        this.setState({
          interval
        });
    }
  }

  _stopWatch() {
    const { interval } = this.state;

    clearInterval(interval);
    this.setState({
      stopWatch: true,
      interval: null
    })
  }

  _addRecord() {
    let { recordCounter, record } = this.state;
    const { totalTime } = this.state;
    recordCounter++;
    record.push({title: 'TIME ' + recordCounter, time: totalTime});
    this.setState({
      record: record,
      recordCounter
    })
  }

  _clearTime() {
    this.setState({
      stopWatch: false,
      totalTime: '00:00.00',
      sectionTime: '00:00.00',
      recordCounter: 0,
     });
  }

  render(){
    const { totalTime, record, sectionTime } = this.state;
    return(
      <View style={styles.watchContainer}>
        <WatchFace totalTime={totalTime} sectionTime={sectionTime}></WatchFace>
        <WatchControl 
          addRecord={()=>this._addRecord()} 
          clearRecord={()=>this._clearRecord()} 
          startWatch={()=>this._startWatch()} 
          stopWatch={()=>this._stopWatch()}>
        </WatchControl>
        <WatchRecord record={record}></WatchRecord>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchContainer: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    marginTop: 60,
  },
});