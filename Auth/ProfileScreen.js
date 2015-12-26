/**
 * @providesModule ProfileScreen
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  DeviceEventEmitter,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBarIOS,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} = React;

let {Colors} = require('BaseStyles');
let NavigationBar = require('NavigationBar');
let IconButton = require('IconButton');

StatusBarIOS.setHidden(true);

class ProfileScreen extends React.Component {

  _back() {
    this.props.navigator.pop();
  }

  _renderBackButton() {
    return (
      <TouchableOpacity onPress={this._onPressButton}>
        <IconButton
          style={styles.backButton}
          onPress={this._back.bind(this)}
          source={require('../images/Back.png')}
          />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topNavigation}>
          {this._renderBackButton()}
        </View>
        <NavigationBar showUser={false} />
        <Text>Your shortname: {this.props.user.short_name}</Text>
        <Text>Your user id: {this.props.user.id}</Text>
        <Text>Your profile photo:</Text>
        <Image style={styles.profileImage} source={{uri: this.props.user.profile_image_url}} />
      </View>
    );
  }
}

let MARGIN = 8;

let styles = StyleSheet.create({

  backButton: {
    height: 16,
    width: 16
  },

  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40
  },

  topNavigation: {
    marginTop: MARGIN*3,
    width: 375,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }

});

module.exports = ProfileScreen;