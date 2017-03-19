'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  AsyncStorage,
  Button,
  TextInput } from 'react-native';
import Util from '../utils/utils';
import TestRecord from '../components/Test/TestRecord';
import axios from 'axios';

export default class TestAsyncStorePerProduct extends Component{
  constructor() {
    super();
    this.state = {
      listProducts: [],
      isLoad: false,
      mode: 0, // 0: begin, 1: load api, 2 insert to db, 3 view
      apiTime: null,
      insertTime: null,
      viewTime: null,
      interval: null,
      startTime: 0,
      limit: '100000',
      url: 'http://192.168.1.58/api/pos_2.php'
    };
  }

  toTime(totalMilliSecond) {
    let ms = totalMilliSecond % 1000;
    totalMilliSecond = (totalMilliSecond - ms) / 1000;
    let secs = totalMilliSecond % 60;
    totalMilliSecond = (totalMilliSecond - secs) / 60;
    let mins = totalMilliSecond % 60;
    let hrs = (totalMilliSecond - mins) / 60;

    hrs = (hrs < 10) ? "0" + hrs : hrs;
    mins = (mins < 10) ? "0" + mins : mins;
    secs = (secs < 10) ? "0" + secs : secs;

    return hrs + ":" + mins + ":" + secs + "." + ms;
  }

  onPressStart() {
    const { isLoad, url, limit } = this.state;

    if (!isLoad) {
      // STEP 1 : get product data from server .
      //Server response JSON : {[{product_id: 1, name: '', create_date ....}, {product_id: 2, name: '', create_date ....}]}
      axios({method: 'GET', url: url, params: { limit }})
      .then((response) => {
        // STEP 2 : insert to AsyncStorage
        let indexs = [];
        this.setState({
          mode: 2, // start insert to storage
          startTime: (new Date()).getTime(),
        })
        if (response.data.length > 0) {
          let products = response.data.map((item, index) => {
            let id = `@PRODUCT_${item.product_id}`;
            indexs.push(id);
            return [id, JSON.stringify(item)];
          });
          AsyncStorage.multiSet(products, (err) => {
            AsyncStorage.setItem('@PRODUCTS', JSON.stringify(indexs), (res) => {
              this.setState({
                startTime: (new Date()).getTime(),
                mode: 3
              });
              // STEP 3 : get data from AsyncStorage 
              AsyncStorage.multiGet(indexs, (err, stores) => {
                let listProducts = stores.map( (result, i, store) => {
                  return JSON.parse(store[i][1]);
                });
                this.setState({
                  listProducts,
                  isLoad: false,
                  startTime: 0,
                  mode: 0
                });
              });
            });
          });
        } else {
          this.setState({
            isLoad: false,
            startTime: 0,
            mode: 0 // reset
          });
        }
      })
      .catch((error) => {
        this.setState({
            isLoad: false,
            startTime: 0,
            mode: 0 // reset
          });
      });

      //set interval
      let interval = setInterval(
      () => {
        const { startTime, isLoad, interval, mode } = this.state;
        let current = (new Date()).getTime();
        if (isLoad) {
          switch(mode) {
            case 1:
              this.setState({
                apiTime: this.toTime(current - startTime),
              });
            break;
            case 2:
              this.setState({
                insertTime: this.toTime(current - startTime),
              });
            break;
            case 3:
              this.setState({
                  viewTime: this.toTime(current - startTime),
                });
            break;
          }
        } else {
          clearInterval(interval);
          this.setState({
            interval: null,
          });
        }
      }, 50);
      
      this.setState({
        interval,
        startTime: (new Date()).getTime(),
        isLoad: true,
        mode: 1 // start load api
      });
    }
  }

  handleUrlChange = (event) => {
    let url = event.nativeEvent.text;
    this.setState({
        url
      });
  };

  handleLimitChange = (event) => {
    let limit = event.nativeEvent.text;
    this.setState({
        limit
      });
  };

  render() {
    const { apiTime, insertTime, viewTime, isLoad, listProducts, limit, url } = this.state;
    return(
      <View style={styles.Container}>
        <Text>LIMIT {limit}</Text>
        <TextInput
            autoCapitalize="none"
            defaultValue={limit}
            onChange={this.handleLimitChange}
            clearButtonMode="while-editing"
          />
        <Text>URL API {url}</Text>
        <TextInput
            autoCapitalize="none"
            defaultValue={url}
            onChange={this.handleUrlChange}
            clearButtonMode="while-editing"
          />
        {apiTime && (<Text> API LOAD : {apiTime} </Text>)}
        {insertTime && (<Text> INSERT TO STORAGE : {insertTime} </Text>)}
        {viewTime && (<Text> GET FROM STORAGE : {viewTime} </Text>)}
        {!isLoad && (<Button
          onPress={this.onPressStart.bind(this)}
          title="Start testing"
          color="#841584"
          accessibilityLabel="Start counting time"
        />)}
        {listProducts.length > 0 && (<TestRecord record={listProducts}></TestRecord>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    marginTop: 65,
  },
});

