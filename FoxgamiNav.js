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

let {Colors} = require('./BaseStyles');

let FBSDKCore = require('react-native-fbsdkcore');
let {FBSDKGraphRequest} = FBSDKCore;
let FacebookLoginManager = require('NativeModules').FacebookLoginManager;

class FoxgamiNav extends React.Component {

  constructor() {
    super();
    this.state = {
      isModalOpen: false
    };
  }

  _login() {
    // TODO: show the nav for facebook whatever
    this.openModal();
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.invisible}>Login</Text>
          <Image
            style={styles.iconNavLogo}
            source={require('./images/logo.png')}
          />
          <TouchableHighlight style={styles.loginContainer} onPress={() => this._login()}>
            <Text style={styles.loginText}>LOG IN</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    width: 375, // TODO: make this responsive
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 12,
    paddingLeft: 12
  },
  invisible: {
    color: Colors.dark
  },
  iconNavLogo: {
    alignItems: 'center',
    width: 28,
    height: 28, // TODO: match this downstairs
    margin: 10,
    marginTop: 26
  },
  loginText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
  loginContainer: {
    marginTop: 20, // TODO: fix this
    height: 28, // TODO: make this a variable
    alignItems: 'center',
    flexDirection: 'row'
  }
});

module.exports = FoxgamiNav;