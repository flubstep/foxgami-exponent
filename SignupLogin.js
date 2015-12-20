/**
 * @providesModule SignupLogin
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} = React;

let {Colors} = require('BaseStyles');

class SignupLogin extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      textEmail: '',
      textPassword: ''
    }
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            onChangeText={(textEmail) => this.setState({textEmail})}
            value={this.state.textEmail}
            placeholder={"E-mail"}
            autoFocus={true}
            autoCapitalize={false}
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
            autoCapitalize={false}
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 175
  },
  inputField: {
    height: 48,
    width: 295,
    fontFamily: 'Gill Sans',
    fontSize: 16,
    fontWeight: '500'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EEEEEE',
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

module.exports = SignupLogin;