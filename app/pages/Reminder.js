'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Util from '../utils/utils';
import ReminderContainer from '../components/Reminder/ReminderContainer';

export default class extends Component{
  constructor() {
    super();
    this.listData = {
      title: 'MY REMINDER',
      theme: '#fe952b',
      list: [],
    };
  }

  render() {
    return(
      <View style={styles.container}>
        <ReminderContainer listData={this.listData}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width,
  }
});

