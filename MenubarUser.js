/**
 * @providesModule MenubarUser
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
let SignupLogin = require('SignupLogin');

class MenubarUser extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      currentUser: null,
      loaded: false,
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    FoxgamiApi.getCurrentUser()
      .then((userInfo) => {
        this.setState({
          userId: userInfo.data.id,
          profileImageUrl: userInfo.data.profile_image_url,
          shortName: userInfo.data.short_name,
          loaded: true,
        });
      })
      .done();
  }

  _login() {
    this.props.navigator.push({
      title: "Signup",
      component: SignupLogin
    });
  }

  _renderWaiting() {
    return (
      <Text style={styles.loginText}>Loading...</Text>
    );
  }

  _renderLogin() {
    return (
      <TouchableHighlight style={styles.loginContainer} onPress={() => this._login()}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableHighlight>
    );
  }

  _renderUser() {
    return (
      <TouchableHighlight style={styles.loginContainer} onPress={() => this._login()}>
        <Text style={styles.loginText}>{this.state.shortName}</Text>
      </TouchableHighlight>
    );
  }

  render() {
    if (!this.state.loaded) {
        return this._renderWaiting();
    } else if (this.state.userId) {
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

module.exports = MenubarUser;