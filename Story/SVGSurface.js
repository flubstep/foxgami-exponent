/**
 * @providesModule SVGSurface
 */

'use strict';

let React = require('react-native');
let {
  View,
  StyleSheet,
  Dimensions
} = React;

let ReactART = require('ReactNativeART');
let {
  Surface,
  Group,
  Shape
} = ReactART;

let {Colors, Sizes} = require('BaseStyles');
let {pointsToSvg} = require('Reaction');

class SVGSurface extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      donePaths: [],
      currentPoints: [],
      currentMax: 0,
      visibleWidth: Dimensions.get('window').width,
      visibleHeight: Dimensions.get('window').height,
    };
  }

  onResponderGrant() {
    // do nothing
  }

  onResponderMove() {
    // do nothing
  }

  onResponderRelease() {
    // do nothing
  }

  render() {
    return (
      <View style={styles.drawContainer}>
        <View
            onStartShouldSetResponder={(evt) => true}
            onMoveShouldSetResponder={(evt) => true}
            onResponderGrant={this.onResponderGrant.bind(this)}
            onResponderMove={this.onResponderMove.bind(this)}
            onResponderRelease={this.onResponderRelease.bind(this)}
          >
          <Surface
            style={styles.drawSurface}
            width={this.state.visibleWidth}
            height={this.state.visibleHeight}
            >
            <Group>
              {this.state.donePaths}
              <Shape
                key={this.state.currentMax}
                d={pointsToSvg(this.state.currentPoints)}
                stroke="#FFFFFF"
                strokeWidth={8}
              />
            </Group>
          </Surface>
          {this.props.children}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({

  drawContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 667,
    width: 375,
    backgroundColor: Colors.transparent,
  },
  drawSurface: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.transparent,
  }

});

module.exports = SVGSurface;
