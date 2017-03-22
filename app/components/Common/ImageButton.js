"use strict";

import React,{ Component } from 'react';
import {
  Image,
  StyleSheet,
  View, Text } from 'react-native';
  
export default class ImageButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: this.props.appearance.normal
    };
  }

  onTouchStart() {
    this.setState({
      image: this.props.appearance.highlight
    });
  }

  onTouchEnd() {
    this.setState({
      image: this.props.appearance.normal
    }, () => {
      if (this.props.onPress) {
        setTimeout(this.props.onPress);
      }
    });
  }

  onTouchCancel() {
    this.setState({
      image: this.props.appearance.normal
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      image: nextProps.appearance.normal
    });
  }

  render() {
    return (
      <View style={ this.props.style }
            onStartShouldSetResponder={ () => true }
            onResponderGrant={ this.onTouchStart.bind(this) }
            onResponderRelease={ this.onTouchEnd.bind(this) }
            onResponderTerminate={ this.onTouchCancel.bind(this) }
            onResponderReject={ this.onTouchCancel.bind(this) }>
        <Image style={ styles.image } source={ this.state.image } resizeMode="stretch" />
        {this.props.title && (<View style={ [this.props.style, styles.title] }>
          <Text style={{color : this.props.colorFont ? this.props.colorFont : '#ffffff'}}>{this.props.title}</Text>
          </View>)}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    height: null
  }, 
  title: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }
});