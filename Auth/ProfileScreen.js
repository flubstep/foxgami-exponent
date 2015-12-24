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
let IconButton = require('IconButton');

class ProfileScreen extends React.Component {

  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar showUser={false} />
        <Text>Your shortname: {this.props.user.short_name}</Text>
        <Text>Your user id: {this.props.user.id}</Text>
        <Text>Your profile photo:</Text>
        <Image style={styles.profileImage} source={{uri: this.props.user.profile_image_url}} />
        <TouchableOpacity onPress={this._goBack.bind(this)}>
          <Text>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {

  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40
  }
});

module.exports = ProfileScreen;