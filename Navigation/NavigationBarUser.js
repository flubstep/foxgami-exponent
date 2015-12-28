/**
 * @providesModule NavigationBarUser
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} = React;

let {Colors} = require('BaseStyles');
let FoxgamiApi = require('FoxgamiApi');

class NavigationBarUser extends React.Component {

  _renderWaiting() {
    return (
      <Text style={styles.loginText}>Loading...</Text>
    );
  }

  _renderLogin() {
    return (
      <TouchableHighlight style={styles.loginContainer} onPress={this.props.onLogin}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableHighlight>
    );
  }

  _renderUser() {
    return (
      <TouchableHighlight style={styles.loginContainer} onPress={this.props.onProfile}>
        <Text style={styles.loginText}>{this.props.user.name}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    if (!this.props.user) {
        return this._renderWaiting();
    } else if (this.props.user.userId) {
        return this._renderUser();
    } else {
        return this._renderLogin();
    }
  }
}

let styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  loginText: {
    fontFamily: 'Gill Sans',
    letterSpacing: 1,
    fontWeight: '500',
    fontSize: 12,
    color: "#BABABA"
  },
  iconNavLogo: {
    alignItems: 'center',
    width: 28,
    height: 28,
    margin: 10,
    marginTop: 26,
  },
});

module.exports = NavigationBarUser;