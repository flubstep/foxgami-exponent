/**
 * @providesModule ShareIconWheel
 */

'use strict';

let React = require('react-native');
let {
  View,
  Animated,
  TouchableHighlight,
  StyleSheet
} = React;

let {Colors, Sizes} = require('BaseStyles');

// TODO: Remove these and use actual user portraits.
const DUMMY_PROFILE_URLS = [
    "http://www.foxgami.com/images/fox-portrait.png",
    "http://www.foxgami.com/images/ness-portrait.png",
    "http://www.foxgami.com/images/samus-portrait.png",
    "http://www.foxgami.com/images/peach-portrait.png",
    "http://www.foxgami.com/images/mario-portrait.png",
    "http://www.foxgami.com/images/charizard-portrait.png",
    "http://www.foxgami.com/images/pikachu-portrait.png",
    "http://www.foxgami.com/images/kirby-portrait.png",
    "http://www.foxgami.com/images/jigglypuff-portrait.png",
    "http://www.foxgami.com/images/yoshi-portrait.png",
    "http://www.foxgami.com/images/roy-portrait.png",
    "http://www.foxgami.com/images/link-portrait.png"
];

const positions12 = [
  [0.5, -0.866],     // 1
  [0, -1],           // 12 o'clock
  [-0.5, -0.866],    // 11
  [-0.866, -0.5],    // 10
  [-1, 0],           // 9
  [-0.866, 0.5],     // 8
  [-0.5, 0.866],     // 7
  [0, 1],            // 6
  [0.5, 0.866],      // 5
  [0.866, 0.5],      // 4
  [1, 0],            // 3
  [0.866, -0.5],     // 2
];

const positions8 = [
  [0.707, -0.707],   // NE
  [0, -1],           // N
  [-0.707, -0.707],  // NW
  [-1, 0],           // W
  [-0.707, 0.707],   // SW
  [0, 1],            // S
  [0.707, 0.707],    // SE
  [1, 0],            // E
];

class ShareTarget extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      scale: new Animated.Value(0),
      position: new Animated.ValueXY(0, 0)
    };
  }

  componentDidMount() {
    let [proportionX, proportionY] = positions12[this.props.index];
    Animated.spring(this.state.position, {
      toValue: {
        x: proportionX * 140,
        y: proportionY * 140
      },
      tension: 800,
      duration: 150
    }).start();

    this.state.scale.setValue(0.3);
    Animated.timing(this.state.scale, {
      toValue: 1.0,
      duration: 150
    }).start();
  }

  render() {
    return (
      <TouchableHighlight>
        <Animated.Image
          style={[
            styles.shareTarget,
            {
              position: 'absolute',
              left: this.props.baseX,
              top: this.props.baseY,
              transform: [
                {scale: this.state.scale},
                ...this.state.position.getTranslateTransform()
              ]
            }
          ]}
          source={{uri: this.props.source}}
        />
      </TouchableHighlight>
    );
  }
}


class ShareIconWheel extends React.Component {

  render() {
    return (
      <View style={styles.shareWheel}>
        {this.props.shareTargets.map((shareTarget, index) => {
          if (this.props.visible) {
            let portraitUrl = DUMMY_PROFILE_URLS[index % DUMMY_PROFILE_URLS.length];
            return (
              <ShareTarget
                key={index}
                source={portraitUrl}
                target={shareTarget}
                index={index}
                baseX={this.props.baseX}
                baseY={this.props.baseY}
              />
              );
          } else {
            return null;
          }
        })}
      </View>
    )
  }
}


let styles = StyleSheet.create({

  shareWheel: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  shareTarget: {
    height: Sizes.replayIconSize,
    width: Sizes.replayIconSize,
    borderRadius: Sizes.replayIconSize/2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)'
  }

});

module.exports = ShareIconWheel;