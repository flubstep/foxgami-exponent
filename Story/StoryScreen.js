/**
 * @providesModule StoryScreen
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
  ScrollView,
  Animated
} = React;

let ReactART = require('ReactNativeART');
let {
  LinearGradient,
  RadialGradient,
  Pattern,
  Transform,
  Path,
  Surface,
  Group,
  ClippingRectangle,
  Shape
} = ReactART;

let TimerMixin = require('react-timer-mixin');

let {Colors} = require('BaseStyles');
let FoxgamiApi = require('FoxgamiApi');
let Firebase = require('firebase');
let rootRef = new Firebase('https://foxgami.firebaseio.com/');

let IconButton = require('IconButton');

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

function pointsToSvg(points) {
  if (points.length > 0) {
    var path = `M ${points[0].x},${points[0].y}`;
    points.forEach((point) => {
      path = path + ` L ${point.x},${point.y}`;
    });
    return path;
  } else {
    return '';
  }
}

let Modes = {
  viewing: 1,
  drawing: 2,
};


class Reaction {

  constructor(gestures) {
    this.gestures = gestures || [];
    this.reset();
  }

  addGesture(points) {
    if (points.length > 0) {
      this.gestures.push(points);
    }
  }

  replayLength() {
    return this.replayedGestures.length;
  }

  reset() {
    this.replayedGestures = [[]];
  }

  empty() {
    return this.gestures.length === 0;
  }

  copy() {
    return new Reaction(this.gestures.slice());
  }

  done() {
    return (
      this.empty() || (
        this.replayedGestures.length === this.gestures.length &&
        this.lastReplayedGesture().length === this.gestures[this.gestures.length-1].length
      ));
  }

  lastReplayedGesture() {
    return this.replayedGestures[this.replayedGestures.length - 1];
  }

  stepGestureLength() {
    let gestureIndex = (this.replayedGestures.length - 1);
    if (!this.gestures[gestureIndex]) {
      return;
    }
    if (this.replayedGestures[gestureIndex].length >= this.gestures[gestureIndex].length) {
      this.replayedGestures.push([]);
    }
  }

  step() {
    if (this.done()) {
      return true;
    }
    this.stepGestureLength();
    let gestureIndex = this.replayedGestures.length - 1;
    let pointIndex = this.replayedGestures[gestureIndex].length;
    let point = this.gestures[gestureIndex][pointIndex];
    this.replayedGestures[gestureIndex].push(point);
    return false;
  }
}

class StoryScreenHeader extends React.Component {

  _handlePulldown() {
    this.props.navigator.pop();
  }

  _handleDraw() {
    this.props.startDrawing();
  }

  _handleShare() {
    this.props.share();
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconButton
            onPress={this._handlePulldown.bind(this)}
            source={require('../images/Pulldown.png')}
            location={"left"}
            />
        </View>
        <View style={styles.headerRight}>
          <IconButton
            onPress={this._handleDraw.bind(this)}
            source={require('../images/Smilie.png')}
            location={"right"}
            />
          <IconButton
            onPress={this._handleShare.bind(this)}
            source={require('../images/Share.png')}
            location={"right"}
            />
        </View>
      </View>
    );
  }
}

class FoxgamiDrawHeader extends React.Component {

  _handleCancel() {
    this.props.stopDrawing();
  }

  _handleDone() {
    this.props.saveReaction();
    this.props.stopDrawing();
  }

  _handleUndo() {
    // TODO
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconButton
            onPress={this._handleCancel.bind(this)}
            source={require('../images/Cancel.png')}
            location={"left"}
            />
        </View>
        <View style={styles.headerRight}>
          <IconButton
            onPress={this._handleUndo.bind(this)}
            source={require('../images/Undo.png')}
            location={"right"}
            />
          <IconButton
            onPress={this._handleDone.bind(this)}
            source={require('../images/Done.png')}
            location={"right"}
          />
        </View>
      </View>
    );
  }
}

class FoxgamiDrawSurface extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      donePaths: [],
      currentPoints: [],
      currentMax: 0,
    };
    this.reaction = new Reaction();
  }

  addTouchPoint(x, y) {
    var newCurrentPoints = this.state.currentPoints;
    newCurrentPoints.push({x: x, y: y});

    this.setState({
      donePaths: this.state.donePaths,
      currentPoints: newCurrentPoints,
      currentMax: this.state.currentMax
    });
  }

  releaseTouch() {
    var newPaths = this.state.donePaths;
    if (this.state.currentPoints.length > 0) {
      newPaths.push(<Shape
        key={this.state.currentMax}
        d={pointsToSvg(this.state.currentPoints)}
        stroke="#FFFFFF"
        strokeWidth={8}
      />);
    }
    this.reaction.addGesture(this.state.currentPoints);
    this.setState({
      donePaths: newPaths,
      currentPoints: [],
      currentMax: this.state.currentMax + 1,
    });
  }

  _handleResponderGrant(evt) {
    this.addTouchPoint(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
  }

  _handleResponderMove(evt) {
    this.addTouchPoint(evt.nativeEvent.pageX, evt.nativeEvent.pageY);
  }

  _handleResponderEnd(evt) {
    this.releaseTouch();
  }

  render() {
    return (
      <View style={styles.drawContainer}>
        <View
          onStartShouldSetResponder={(evt) => true}
          onMoveShouldSetResponder={(evt) => true}
          onResponderGrant={this._handleResponderGrant.bind(this)}
          onResponderMove={this._handleResponderMove.bind(this)}
          onResponderRelease={this._handleResponderEnd.bind(this)}
          >
          <Surface style={styles.drawSurface} width={375} height={667}>
            <Group>
              {this.state.donePaths}
              <Shape key={this.state.currentMax} d={pointsToSvg(this.state.currentPoints)} stroke="#FFFFFF" strokeWidth={8} />
            </Group>
          </Surface>
        </View>
        <FoxgamiDrawHeader
          stopDrawing={this.props.stopDrawing}
          saveReaction={() => this.props.saveReaction(this.reaction)}
        />
      </View>
    )
  }
}


// TODO: This shares a lot of functionality with the above...
// consolidate into its own base class
var FoxgamiReplaySurface = React.createClass({

  mixins: [TimerMixin],

  getInitialState() {
    return {
      complete: false,
      donePaths: [],
      currentPoints: [],
      currentMax: 1
    };
  },

  componentDidMount() {
    this.setInterval(this.onTick, 20);
  },

  onTick() {
    if (!this.props.reaction) {
      return;
    }
    if (this.state.complete) {
      return;
    }

    let reaction = this.props.reaction;
    let nextState = this.state;

    if (reaction.step() === true) {
      nextState.complete = true;
    }

    if (reaction.replayLength() > this.state.currentMax) {
      let lastCompleteGesture = reaction.replayedGestures[this.state.currentMax];
      let lastCompletePath = pointsToSvg(lastCompleteGesture);
      let lastShape = (<Shape
        key={this.state.currentMax}
        d={pointsToSvg(this.state.currentPoints)}
        stroke="#FFFFFF"
        strokeWidth={8}
      />);
      nextState.donePaths.push(lastShape);
      nextState.currentMax++;
    }

    if (this.state.currentMax <= reaction.replayedGestures.length) {
      nextState.currentPoints = reaction.lastReplayedGesture().slice();
    }
    this.setState(nextState);
  },

  render() {
    return (
      <View style={styles.drawContainer}>
        <Surface style={styles.drawSurface} width={375} height={667}>
          <Group>
            {this.state.donePaths}
            <Shape key={this.state.currentMax} d={pointsToSvg(this.state.currentPoints)} stroke="#FFFFFF" strokeWidth={8} />
          </Group>
        </Surface>
        <StoryScreenHeader
          startDrawing={this.props.startDrawing}
          share={this.props.playReaction}
          navigator={this.props.navigator}
        />
      </View>
    );
  }

});


class FoxgamiReactionPlayer extends React.Component {

  constructor(props, context)  {
    super(props, context);
    this.state = {
      bounceValue: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.state.bounceValue.setValue(0.3);
    Animated.spring(
      this.state.bounceValue, {
        toValue: 1.0,
        friction: 3.0
      }
    ).start();
  }

  play() {
    this.props.playReaction(this.props.reaction.copy());
  }

  render() {
    let profileIndex = (this.props.replayIndex % DUMMY_PROFILE_URLS.length);
    let profileUrl = DUMMY_PROFILE_URLS[profileIndex];
    return (
      <TouchableOpacity onPress={this.play.bind(this)}>
        <Animated.Image style={[
          styles.replayIcon,
          {
            transform: [{
              scale: this.state.bounceValue
            }]
          }
        ]}
        source={{uri: profileUrl}}
        />
      </TouchableOpacity>
    );
  }
}


class FoxgamiReactionPlayerList extends React.Component {

  renderReaction(reaction, index) {
    return (
      <FoxgamiReactionPlayer
        key={index}
        playReaction={this.props.playReaction}
        reaction={reaction}
        replayIndex={index+1}
      />);
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
          {this.props.reactionList.map(this.renderReaction.bind(this))}
        </ScrollView>
      </View>
    );
  }
}


class StoryScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.firebaseRef = rootRef.child('reactions').child(this.props.story.id);
    this.state = {
      playingReaction: null,
      reactions: [],
      mode: Modes.viewing
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
      mode: Modes.viewing
    });
  }

  _startDrawing(mode) {
    this.setState({
      playingReaction: null,
      mode: Modes.drawing
    });
  }

  _stopDrawing(mode) {
    this.setState({
      mode: Modes.viewing
    });
  }

  renderSurface() {
    if (this.state.mode === Modes.drawing) {
      return (
        <FoxgamiDrawSurface
          stopDrawing={this._stopDrawing.bind(this)}
          saveReaction={this._saveReaction.bind(this)}
          navigator={this.props.navigator}
        />
      );
    } else {
      return (
        <FoxgamiReplaySurface
          key={new Date()}
          reaction={this.state.playingReaction}
          startDrawing={this._startDrawing.bind(this)}
          playReaction={this._playLatestReaction.bind(this)}
          navigator={this.props.navigator}
        />
      );
    }
  }

  renderPlayerList() {
    if (this.state.mode === Modes.viewing) {
      return (
        <FoxgamiReactionPlayerList
          reactionList={this.state.reactions}
          playReaction={this._playReaction.bind(this)}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.storyImage}
          source={{uri: this.props.story.image_url}}
        />
        {this.renderSurface()}
        {this.renderPlayerList()}
      </View>
    );
  }
}

let iconSize = 48;

let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  drawContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 667,
    width: 375,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  header: {
    position: 'absolute',
    top: 0,
    paddingTop: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 375,
  },
  headerRight: {
    flexDirection: 'row',
    marginRight: 8 + 12,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  storyImage: {
    height: 375,
    width: 375,
  },
  drawSurface: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  replayList: {
    position: 'absolute',
    height: iconSize,
    bottom: 16,
    left: 16,
    width: 375 - (16*2),
    padding: 0,
  },
  replayIcon: {
    height: iconSize,
    width: iconSize,
    borderRadius: iconSize / 2,
    marginTop: 0,
    marginRight: 12
  },
  replayKey: {
    textAlign: "center",
    color: Colors.white,
    opacity: 0.4,
    lineHeight: iconSize - 10,
    fontSize: 24,
    fontWeight: "500",
    backgroundColor: 'rgba(0,0,0,0)',
  }

});

module.exports = StoryScreen;