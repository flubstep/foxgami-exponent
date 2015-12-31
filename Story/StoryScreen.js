/**
 * @providesModule StoryScreen
 */

'use strict';

let React = require('react-native');
let {
  StyleSheet,
  View,
  Image
} = React;

let {Colors, Sizes} = require('BaseStyles');
let Reaction = require('Reaction');
let FoxgamiApi = require('FoxgamiApi');

// TODO: Remove these references and move everything into FoxgamiApi
let Firebase = require('firebase');
let rootRef = new Firebase('https://foxgami.firebaseio.com/');

let SVGDrawSurface = require('SVGDrawSurface');
let SVGPlayerSurface = require('SVGPlayerSurface');
let StoryDrawingHeader = require('StoryDrawingHeader');
let StoryPlayingHeader = require('StoryPlayingHeader');
let ReactionPlayerScrollView = require('ReactionPlayerScrollView');

let Modes = {
  VIEWING: 1,
  DRAWING: 2
};

class StoryScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.firebaseRef = rootRef.child('reactions').child(this.props.story.id);
    this.state = {
      playingReaction: null,
      reactions: [],
      mode: Modes.VIEWING
    };
  }

  componentDidMount() {
    FoxgamiApi.subscribeReaction(this.props.story.id, (reactionsRaw) => {
      let reactions = reactionsRaw.map(
        (reactionList) => {
          return new Reaction(reactionList);
        }
      );
      this.setState({
        reactions
      });
    });
  }

  _saveReaction(reaction) {
    if (!reaction.empty()) {
      this.firebaseRef.transaction((reactions) => {
        reactions = reactions || [];
        return reactions.concat([reaction.gestures]);
      });
    }
  }

  // TODO: remove once not testing
  _playLatestReaction() {
    if (this.state.reactions.length > 0) {
      let reaction = this.state.reactions[this.state.reactions.length - 1];
      this._playReaction(reaction.copy());
    }
  }

  _playReaction(reaction) {
    this.setState({
      playingReaction: reaction,
      mode: Modes.VIEWING
    });
  }

  _startDrawing(mode) {
    this.setState({
      playingReaction: null,
      mode: Modes.DRAWING
    });
  }

  _stopDrawing(mode) {
    this.setState({
      mode: Modes.VIEWING
    });
  }

  renderSurface() {
    if (this.state.mode === Modes.DRAWING) {
      let newReaction = new Reaction();
      return (
        <SVGDrawSurface reaction={newReaction}>
          <StoryDrawingHeader
            onPressStop={this._stopDrawing.bind(this)}
            onPressUndo={() => "TODO"}
            onPressSave={() => this._saveReaction(newReaction)}
          />
        </SVGDrawSurface>
      );
    } else {
      return (
        <SVGPlayerSurface
          key={new Date()}
          reaction={this.state.playingReaction}
          onSwipeRight={this.props.navigator.pop}
          >
          <StoryPlayingHeader
            onPressDraw={this._startDrawing.bind(this)}
            onPressShare={this._playLatestReaction.bind(this)}
            onPressBack={this.props.navigator.pop}
          />
        </SVGPlayerSurface>
      );
    }
  }

  renderPlayerList() {
    return (
      <ReactionPlayerScrollView
        reactions={this.state.reactions}
        onPressReaction={(reaction) => this._playReaction(reaction)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.storyImage}
          source={{uri: this.props.story.image_url}}
        />
        {this.renderSurface()}
        {this.state.mode == Modes.VIEWING ? this.renderPlayerList() : null}
      </View>
    );
  }
}

let styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  storyImage: {
    height: 375,
    width: 375,
  }

});

module.exports = StoryScreen;