'use strict';

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Util from '../utils/utils';
import ReminderContainer from '../components/Reminder/ReminderContainer';
import PageHeader from '../components/Common/PageHeader';

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
    const { navigator, index } = this.props;

    return(
      <View style={styles.container}>
        <PageHeader navigator={navigator} index={index} />
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

