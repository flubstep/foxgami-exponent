/**
 * @providesModule NavigationBar
 */

'use strict';

let React = require('react-native');
let {
  AppRegistry,
  DeviceEventEmitter,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Modal
} = React;

let {Colors} = require('BaseStyles');

let NavigationBarUser = require('NavigationBarUser');

class NavigationBar extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleWidth: Dimensions.get('window').width
    }
  }

  _renderUser() {
    if (this.props.showUser) {
      return (
        <NavigationBarUser
          user={this.props.user}
          onProfile={this.props.onProfile}
          onLogin={this.props.onLogin}
          />
      );
    } else {
      return (
        <Text style={styles.invisible}>Login</Text>
      );
    }
  }

  render() {
    return (
      <View style={{width: this.state.visibleWidth}}>
        <View style={styles.topNavigation}>
          <Text style={styles.invisible}>Login</Text>
          <Image
            style={[styles.iconNavLogo,
              {
                height: this.props.height,
                width: this.props.height
              }]}
            source={require('../images/logo.png')}
          />
          {this._renderUser()}
        </View>

      </View>
    );
  }
}

let MARGIN = 8;

NavigationBar.defaultProps = {
  onLogin: null,
  onProfile: null,
  height: 24
};

let styles = StyleSheet.create({

  topNavigation: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: MARGIN*1.5,
    paddingLeft: MARGIN*1.5
  },

  invisible: {
    color: Colors.white
  },

  iconNavLogo: {
    alignItems: 'center',
    margin: MARGIN
  },

  loginText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  }

});

module.exports = NavigationBar;