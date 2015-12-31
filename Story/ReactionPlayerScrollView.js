/**
 * @providesModule ReactionPlayerScrollView
 */

let React = require('react-native');
let {
  View,
  StyleSheet,
  ScrollView
} = React;

let {Colors, Sizes} = require('BaseStyles');
let ReactionButton = require('ReactionButton');

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

class ReactionPlayerScrollView extends React.Component {

  renderReaction(reaction, index) {
    const portraitIndex = index % DUMMY_PROFILE_URLS.length;
    const portraitUrl = DUMMY_PROFILE_URLS[portraitIndex];
    return (
      <ReactionButton
        key={index}
        onPress={() => {this.props.onPressReaction(reaction)}}
        portraitUrl={portraitUrl}
      />
    );
  }

  render() {
    return (
      <View style={styles.replayList}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          directionalLockEnabled={true}
          >
          {this.props.reactions.map(this.renderReaction.bind(this))}
        </ScrollView>
      </View>
    );
  }
}

ReactionPlayerScrollView.defaultProps = {
  reactions: []
};

let styles = StyleSheet.create({

  replayList: {
    position: 'absolute',
    height: Sizes.replayIconSize,
    bottom: 16,
    left: 16,
    width: 375 - (16*2), // TODO(Dimensions)
    padding: 0,
  }

});

module.exports = ReactionPlayerScrollView;