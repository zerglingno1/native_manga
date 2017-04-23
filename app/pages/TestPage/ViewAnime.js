'use strict';

import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  ListView,
  Image, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Picker, 
  BackAndroid, 
  WebView } from 'react-native';
import FitImage from 'react-native-fit-image';
import ActionButton from 'react-native-action-button';
import PageHeader from '../../components/Common/PageHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Util from '../../utils/utils';
import CheerioUtil from '../../utils/CheerioUtil';
import StorageUtil from '../../utils/StorageUtil';
import FileUtil from '../../utils/FileUtil';
import axios from 'axios';

export default class ViewAnime extends Component{
  constructor() {
    super();
    this.state = {
      chaps: [],
      current: '',
      next: '',
      back: '',
      video: '',
      WebView
    };
  }

  componentWillMount() {
    this.loadManga();

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });
  }

  componentDidMount() {
  }

  async loadManga() {
    const { data } = this.props;
    console.warn(data.host + data.anime.url);
    axios({method: 'GET', url: 'http://anime47.com/phim/seiren/m6047.html', params: { }, headers: {
      'Host': 'anime47.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': 1,
      'Referer': 'http://anime47.com/tim-nang-cao/?status=&season=&year=&sort=popular&keyword=',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36',
      'Cookie': '__cfduid=df96b6c0b3343f8f631a3b8927e89bbea1490422966; cf_clearance=afea2253a54e7109b4da0e82f6f8b17f1a03a0f2-1490422972-604800; cpmStarPopUnder67388=1490422991492; PHPSESSID=rema5h2nl8vss95k170ujvnpk1; __RC=31; __R=2; _gat=1; __UF=1%2C4; __uif=__uid%3A2188102211712316952%7C__ui%3A1%2C4%7C__create%3A1488102211; __tb=0; __IP=712007108; _ga=GA1.2.81177655.1490422982; lcache=1'
    }})
      .then(async (response) => {
        let startUrl = CheerioUtil.getStartButton(response.data);
        axios({method: 'GET', url: startUrl, params: { }, headers: {
      'Host': 'anime47.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': 1,
      'Referer': 'http://anime47.com/tim-nang-cao/?status=&season=&year=&sort=popular&keyword=',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36',
      'Cookie': '__cfduid=df96b6c0b3343f8f631a3b8927e89bbea1490422966; cf_clearance=afea2253a54e7109b4da0e82f6f8b17f1a03a0f2-1490422972-604800; cpmStarPopUnder67388=1490422991492; PHPSESSID=rema5h2nl8vss95k170ujvnpk1; __RC=31; __R=2; __UF=1%2C4; __uif=__uid%3A2188102211712316952%7C__ui%3A1%2C4%7C__create%3A1488102211; __tb=0; __IP=712007108; lcache=1;'
    }})
        .then(async (response) => {
          let videoUrl = CheerioUtil.getVideoUrl(response.data);
          this.setState({
            video: videoUrl,
          });
        }).catch((error) => {
          console.warn(error);
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  _onValueChange = (value) => {
    const { current, chaps } = this.state;

    if (value && current != value) {
      let title = '';
      chaps.forEach((chap) => {
        if(chap.url == value) {
          title = chap.title;
          return;
        }
      });

      this.setState({
        title,
        current: value
      });
    }
  };


  render() {
      const { pages, current, options, chaps, video } = this.state;
      const { navigator, index } = this.props;

      let source = {uri: video};
    return(
      <View style={styles.container}>
        <View style={styles.faceContainer}>
          <Text style={styles.faceIntroduce}>{'Video'}</Text>
          <Picker
            style={styles.picker}
            selectedValue={current}
            mode="dialog">
            {chaps && chaps.map((chap) => (<Picker.Item label={`${chap.title}`} value={`${chap.url}`} />))}
          </Picker>
        </View>
        <ScrollView style={styles.recordList} scrollsToTop={true}>
          {video != '' && (<WebView
            ref='web'
            style={styles.webView}
            automaticallyAdjustContentInsets={false}
            source={source}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            scalesPageToFit={true}
          />)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width,
    //marginTop: 65,
    marginTop: 0
  },
  faceContainer: {
    width: Util.size.width,
    paddingLeft: 30, paddingRight:30,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    height: 60,
    flexDirection: 'row'
  },
  faceIntroduce: {
    width: Util.size.width * 50 / 100,
    fontSize: 20,
    fontWeight: '200',
    color: '#222',
    flex: 2,
    marginTop: 8,
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: Util.size.height - 70 - 40,
  },
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 70 - 40,
    backgroundColor: '#bbb'
  },
  recordItem: {
    paddingBottom: 15, paddingTop: 15
  },

  btnStyle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picker: {
    width: 100,
    height: 40,
    marginTop: 5,
    flex: 1,
  },
});

