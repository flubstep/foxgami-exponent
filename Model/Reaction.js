/**
 * @providesModule Reaction
 */


// TODO: Move this in as a "Gesture" object in the Reaction model
// Convert a list of points [{x, y}] into an SVG path
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

Reaction.pointsToSvg = pointsToSvg;

module.exports = Reaction