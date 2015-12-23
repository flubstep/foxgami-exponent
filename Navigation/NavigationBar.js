/**
 * @providesModule NavigationBar
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Modal
} = React;

let FBSDKCore = require('react-native-fbsdkcore');
let {FBSDKGraphRequest} = FBSDKCore;
let FacebookLoginManager = require('NativeModules').FacebookLoginManager;

let {Colors} = require('BaseStyles');

let NavigationBarUser = require('NavigationBarUser');

class NavigationBar extends React.Component {

  _renderUser() {
    if (this.props.showUser) {
      return (
        <NavigationBarUser
          onProfile={this.props.onProfile}
          onLogin={this.props.onLogin}
          navigator={this.props.navigator}
          />
      );
    } else {
      return (
        <Text style={styles.invisible}>Login</Text>
      );
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.invisible}>Login</Text>
          <Image
            style={styles.iconNavLogo}
            source={require('../images/logo.png')}
          />
          {this._renderUser()}
        </View>

      </View>
    );
  }
}

let navHeight = 24;

let styles = StyleSheet.create({
  container: {
    width: 375, // TODO: make this flex 1
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingLeft: 12
  },
  invisible: {
    color: Colors.white
  },
  iconNavLogo: {
    alignItems: 'center',
    width: navHeight,
    height: navHeight,
    margin: 10
  },
  loginText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  loginContainer: {
    marginTop: 20, // TODO: fix this
    height: navHeight,
    alignItems: 'center',
    flexDirection: 'row'
  }
});

module.exports = NavigationBar;