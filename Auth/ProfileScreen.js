/**
 * @providesModule ProfileScreen
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

let NavigationBar = require('NavigationBar');

class ProfileScreen extends React.Component {

  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen Placeholder</Text>
        <TouchableOpacity onPress={this._goBack.bind(this)}>
          <Text>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {

  }
});

module.exports = ProfileScreen;