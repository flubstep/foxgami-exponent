/**
 * @providesModule SVGPlayerSurface
 */
'use strict';

let React = require('react-native');
let {Shape} = require('ReactNativeART');
let ReactMixin = require('react-mixin');
let TimerMixin = require('react-timer-mixin');

let {pointsToSvg} = require('Reaction');
let SVGSurface = require('SVGSurface');


class SVGPlayerSurface extends SVGSurface {

  componentDidMount() {
    this.setInterval(this.onTick, 20);
  }

  onResponderRelease(evt, gestureState) {
    if (gestureState.dx > 100 &&
        Math.abs(gestureState.dy) < Math.abs(gestureState.dx)) {
      this.props.onSwipeRight();
    }
  }

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
      let lastShape = (
        <Shape
          key={this.state.currentMax}
          d={pointsToSvg(this.state.currentPoints)}
          stroke="#FFFFFF"
          strokeWidth={8}
        />
      );
      nextState.donePaths.push(lastShape);
      nextState.currentMax++;
    }

    if (this.state.currentMax <= reaction.replayedGestures.length) {
      nextState.currentPoints = reaction.lastReplayedGesture().slice();
    }
    this.setState(nextState);
  }
}

SVGPlayerSurface.defaultProps = {
  onSwipeRight: (() => {})
}

// TODO: Not sure what to do to get the decorator to work
module.exports = ReactMixin.decorate(TimerMixin)(SVGPlayerSurface);