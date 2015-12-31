/**
 * @providesModule ReactionButton
 */

'use strict';

let React = require('react-native');
let {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity
} = React;

let {Colors, Sizes} = require('BaseStyles');

class ReactionButton extends React.Component {

  constructor(props, context)  {
    super(props, context);
    this.state = {
      bounceValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.state.bounceValue.setValue(0.3);
    Animated.timing(
      this.state.bounceValue, {
        duration: 400,
        toValue: 1.0
      }
    ).start();
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Animated.Image style={[
          styles.replayIcon,
          {
            transform: [{
              scale: this.state.bounceValue
            }]
          }
        ]}
        source={{uri: this.props.portraitUrl}}
        />
      </TouchableOpacity>
    );
  }
}

let styles = StyleSheet.create({

  replayIcon: {
    height: Sizes.replayIconSize,
    width: Sizes.replayIconSize,
    borderRadius: Sizes.replayIconSize/2,
    marginTop: 0,
    marginRight: Sizes.replayIconSize/4
  }

});


module.exports = ReactionButton;
