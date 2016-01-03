/**
 * @providesModule IconButton
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  PanResponder,
  PropTypes,
  TouchableOpacity,
  ScrollView
} = React;

let {Colors} = require('BaseStyles');

class IconButton extends React.Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.iconButton}
        onPress={this.props.onPress}
        onPressIn={this.props.onPressIn}
        >
        <Image
          style={styles.icon}
          source={this.props.source}
          />
      </TouchableOpacity>
    )
  }
}

IconButton.defaultProps = {
  onPress: (() => {}),
  onPressIn: (() => {})
};

let styles = StyleSheet.create({
  icon: {
    marginLeft: 24
  },
  iconButton: {
    height: 32,
  }
});

module.exports = IconButton;