/**
 * @providesModule SignupLoginScreen
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} = React;

let {Colors} = require('BaseStyles');

class SignupLoginScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      textUsername: '',
      textEmail: '',
      textPassword: ''
    }
  }

  _goBack() {
    this.props.navigator.pop();
  }

  _renderBackButton() {
    return (
      <TouchableOpacity onPress={this._onPressButton}>
        <Image
          style={styles.backButton}
          source={require('../images/CancelGray.png')}
        />
      </TouchableOpacity>
    );
  }

  _renderLoginButton() {
    if (this.state.textUsername && this.state.textEmail && this.state.textPassword) {
      return (
        <TouchableHighlight
          style={styles.loginButton}
          >
          <Text style={styles.loginText}>LOG IN</Text>
        </TouchableHighlight>
      );
    } else {
      return (
        <View style={styles.placeholderButton}>
        </View>
      );
    }
  }

  _renderSignupLink() {
    return (
      <TouchableHighlight
        style={styles.signupButton}
        >
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableHighlight>
    );
  }

  _renderTermsLink() {
    return (
      <TouchableHighlight
        style={styles.signupButton}
        >
        <Text style={styles.signupText}>TERMS</Text>
      </TouchableHighlight>
    );
  }

  render() {
    /*
      X out to return to main feed
      email input field
      password input field
      forgot password link
      sign up link
    */
    return (
      <View style={styles.container}>
        <View style={styles.topNavigation}>
          {this._renderBackButton()}
        </View>
        <View>
          <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                onChangeText={(textUsername) => this.setState({textUsername})}
                value={this.state.textUsername}
                placeholder={"Full Name"}
                autoFocus={true}
                autoCapitalize={'words'}
                autoCorrect={false}
                keyboardType={'default'}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(textEmail) => this.setState({textEmail})}
              value={this.state.textEmail}
              placeholder={"E-mail"}
              autoFocus={true}
              autoCapitalize={"none"}
              autoCorrect={false}
              keyboardType={'email-address'}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              onChangeText={(textPassword) => this.setState({textPassword})}
              value={this.state.textPassword}
              placeholder={"Password"}
              autoCapitalize={"none"}
              autoCorrect={false}
              secureTextEntry={true}
            />
          </View>
          {this._renderLoginButton()}
        </View>
        <View style={styles.bottomNavigation}>
          {this._renderTermsLink()}
          {this._renderSignupLink()}
        </View>
      </View>
    );
  }
}

let MARGIN = 40;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  topNavigation: {
    marginTop: MARGIN/2,
    width: 375 - MARGIN,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  bottomNavigation: {
    marginBottom: MARGIN,
    width: 375 - MARGIN,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButton: {
    height: 16,
    width: 16
  },
  placeholderButton: {
    height: 40,
    width: 375 - MARGIN*2,
    marginTop: 36
  },
  loginButton: {
    height: 40,
    width: 375 - MARGIN*2,
    marginTop: 36,
    borderRadius: 20,
    backgroundColor: Colors.darker,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '700',
    color: Colors.white
  },
  signupText: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '700',
    color: Colors.darker
  },
  signupButton: {

  },
  inputField: {
    height: 48,
    width: 295,
    fontFamily: 'Gill Sans',
    fontSize: 16,
    fontWeight: '500'
  },
  inputContainer: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 2
  },
  iconNavLogo: {
    alignItems: 'center',
    width: 28,
    height: 28,
    margin: 10,
    marginTop: 26,
  },
});

module.exports = SignupLoginScreen;