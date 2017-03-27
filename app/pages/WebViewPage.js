import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';

export default class WebViewPage extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Google', url: 'http://google.com/', status: '' },
        { key: '2', title: '+' },
      ],
      route: '1',
      url: 'http://google.com/',
      status: 'No Page Loaded',
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      loading: true,
      scalesPageToFit: true,
    };
  }
  
  inputText = '';
  webview = [];

  handleTextInputChange = (event) => {
    let url = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url;
    }
    this.inputText = url;
  };

  render() {
    const { _goBack } = this.props
    this.inputText = this.state.url;

    let source = {uri: this.state.url};
    return (
      <View style={[styles.container]}>
        <View style={[styles.addressBarRow]}>
          <TouchableOpacity
            onPress={_goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               <Icon size={20} name='ios-close-outline'></Icon>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               <Icon size={20} name='ios-arrow-back-outline'></Icon>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goForward}
            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              <Icon size={20} name='ios-arrow-forward-outline'></Icon>
            </Text>
          </TouchableOpacity>
          <TextInput
            ref='urlInput'
            autoCapitalize="none"
            defaultValue={this.state.url}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}
          />
          <TouchableOpacity onPress={this.pressGoButton}>
            <View style={styles.goButton}>
              <Text>
                 <Icon size={20} name='md-arrow-round-forward'></Icon>
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TabViewAnimated
          style={styles.slideContainer}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onRequestChangeTab={this._handleChangeTab}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.status}</Text>
        </View>
      </View>
    );
  }

  _handleChangeTab = (index) => {
    let { routes } = this.state;
    if(index == routes.length - 1 && routes.length < 5) {
      let count = routes.length;

      routes[index].title = 'tab';
      routes[index].url = 'http://google.com';

      routes.push({ key: String(count + 1), title: '+', url: '' });
      this.setState({ 
        index,
        routes,
        url: 'http://google.com'
      });
    } else {
      this.setState({ index, url: routes[index].url, status: routes[index].status});
    }
  };

  _renderScene = ({ route }) => {
    return <View style={[ styles.page, { backgroundColor: '#3b5998' } ]} />;
  };

  _renderHeader = (props) => {
    return <TabBar style={[{ backgroundColor: '#3b5998', height: 50, flexWrap: 'wrap' } ]} tabWidth = {30} {...props} />;
  };

   _renderScene = ({ route, index }) => {
    let source = {uri: route.url};
    const { routes } = this.state;
    if(index != routes.length - 1) {
      return (<WebView
      ref={webview => { 
          this.webview.push(webview);
        }}
      automaticallyAdjustContentInsets={false}
      style={styles.webView}
      source={source}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      decelerationRate="normal"
      onNavigationStateChange={this._onNavigationStateChange}
      onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
      startInLoadingState={true}
      scalesPageToFit={this.state.scalesPageToFit}
      onMessage={this._onMessage}
    />);
    }
    
  };

  _onMessage = (e) => {
    console.warn(e);
  };

  goBack = () => {
    const { index } = this.state;
    this.webview[index].goBack();
  };

  goForward = () => {
    const { index } = this.state;
    this.webview[index].goForward();
  };

  reload = () => {
    const { index } = this.state;
    this.webview[index].reload();
  };

  _onShouldStartLoadWithRequest = (event) => {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  };

  _onNavigationStateChange = (navState) => {
    let { routes, index } = this.state;
    routes[index].status = navState.title;
    routes[index].title = (navState.title != '') ? navState.title : navState.url;
    routes[index].url = navState.url;
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true,
      routes
    });
  };

  onSubmitEditing = (event) => {
    this.pressGoButton();
  };

  pressGoButton = () => {
    let url = this.inputText.toLowerCase();
    const { routes, index } = this.state;
    if (url === routes[index].url) {
      this.reload();
    } else {
      routes[index].url = url;
      this.setState({
        routes,
        url
      });
    }
    // dismiss keyboard
    this.refs['urlInput'].blur();
  };
}

class Button extends React.Component {
  _handlePress = () => {
    if (this.props.enabled !== false && this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={styles.button}>
          <Text>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

var styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#3b5998',
    //marginTop: 65,
    marginTop: 0,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    height: 32,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    height: 32,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 32,
    width: 30,
    padding: 3,
    marginLeft: 8,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderColor: 'transparent',
    borderRadius: 3,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});