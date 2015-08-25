/**
 * This is the entry point for your experience that you will run on Exponent.
 *
 * Start by looking at the render() method of the component called
 * FirstExperience. This is where the text and example components are.
 */
'use strict';

let React = require('react-native');
let {
  Animated,
  AppRegistry,
  Easing,
  Image,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} = React;

let FoxgamiMain = require('./FoxgamiMain');

class Foxgami extends React.Component {

  render() {
    return (
      <FoxgamiMain />
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

AppRegistry.registerComponent('main', () => Foxgami);
