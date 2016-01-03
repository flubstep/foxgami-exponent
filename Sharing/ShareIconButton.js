/**
 * @providesModule ShareIconButton
 */

'use strict';

let React = require('react-native');
let {
  View,
  Animated,
  StyleSheet
} = React;

let {Colors, Sizes} = require('BaseStyles');
let FoxgamiApi = require('FoxgamiApi');
let IconButton = require('IconButton');


class ShareIconButton extends React.Component {

  showShareTargets() {
    this.refreshShareLocation(true);
  }

  refreshShareLocation(shouldToggle=false) {
    this.refs.shareButton.measure((fx, fy, width, height, posX, posY) => {
      let centerX = (
        posX                      // leftmost pixel
        + width                   // rightmost pixel
        - Sizes.iconSize/2        // center of icon
        - Sizes.replayIconSize/2  // leftmost of replayIcon
      );
      let centerY = (
        posY                      // topmost pixel
        + Sizes.iconSize/2        // center of icon
        - Sizes.replayIconSize/2  // top of replayIcon
      );
      FoxgamiApi.moveSharing(centerX, centerY);
      if (shouldToggle) {
        FoxgamiApi.toggleSharing(this.props.share);
      }
    });
  }

  render() {
    let shareTargets = [1, 2, 3, 4, 5, 6];
    return (
      <View ref="shareButton" style={styles.shareContainer}>
        <IconButton
          onPressIn={this.showShareTargets.bind(this)}
          source={require('../images/ShareGray.png')}
          />
      </View>
    )
  }
}

let styles = StyleSheet.create({
  shareContainer: {

  }
});

module.exports = ShareIconButton;