/**
 * @providesModule SignupLoginScreen
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity
} = React;

let {Colors} = require('BaseStyles');

let IconButton = require('IconButton');

class SignupLoginScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      textUsername: '',
      textEmail: '',
      textPassword: '',
      visibleHeight: Dimensions.get('window').height
    }
  }

  componentWillMount () {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  keyboardWillShow (e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height
    this.setState({visibleHeight: newSize})
  }

  keyboardWillHide (e) {
    this.setState({visibleHeight: Dimensions.get('window').height})
  }

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

  _renderLoginButton() {
    if (this.state.textUsername && this.state.textEmail && this.state.textPassword) {
      return (
        <TouchableHighlight style={styles.loginButton}>
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
      <TouchableHighlight style={styles.signupButton}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableHighlight>
    );
  }

  _renderTermsLink() {
    return (
      <TouchableHighlight style={styles.signupButton}>
        <Text style={styles.signupText}>TERMS</Text>
      </TouchableHighlight>
    );

  }

  render() {
    /*
      X out to return to main feed
      full name input field
      email input field
      password input field
      forgot password link
      terms Link
      sign up link
    */
    return (
      <View style={{height: this.state.visibleHeight}}>
        <View style={styles.topNavigation}>
          {this._renderBackButton()}
        </View>
        <View style={styles.container}>
          <View style={styles.signUpForm}>
            <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputField}
                  onChangeText={(textUsername) => this.setState({textUsername})}
                  value={this.state.textUsername}
                  placeholder={"Username"}
                  autoFocus={true}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  keyboardType={'default'}
                  enablesReturnKeyAutomatically={true}
                />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                onChangeText={(textEmail) => this.setState({textEmail})}
                value={this.state.textEmail}
                placeholder={"E-mail"}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType={'email-address'}
                enablesReturnKeyAutomatically={true}
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
                enablesReturnKeyAutomatically={true}
                />
            </View>
            {this._renderLoginButton()}
          </View>
          <View style={styles.bottomNavigation}>
            {this._renderTermsLink()}
            {this._renderSignupLink()}
          </View>
        </View>
      </View>
    );
  }
}

let MARGIN = 8;

let styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  topNavigation: {
    marginTop: MARGIN*3,
    width: 375,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },

  bottomNavigation: {
    marginBottom: MARGIN*2,
    width: 375 - MARGIN*4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  backButton: {
    height: 16,
    width: 16
  },

  placeholderButton: {
    height: 48,
    width: 375 - MARGIN*8,
    marginTop: 36
  },

  signUpForm: {
    flex: 1,
    justifyContent: 'center'
  },

  loginButton: {
    borderRadius: 24,
    height: 48,
    width: 375 - MARGIN*8,
    marginTop: 36,
    backgroundColor: Colors.darker,
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
    color: Colors.darker,
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: '700'
  },

  signupButton: {

  },

  inputField: {
    height: 48,
    fontFamily: 'Gill Sans',
    fontSize: 16,
    fontWeight: '500',
    paddingTop: 16,
    width: 375 - MARGIN*8
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
  }

});

module.exports = SignupLoginScreen;