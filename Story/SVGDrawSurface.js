/**
 * @providesModule SVGDrawSurface
 */

let React = require('react-native');
let {Shape} = require('ReactNativeART');

let SVGSurface = require('SVGSurface');

let {pointsToSvg} = require('Reaction');


class SVGDrawSurface extends SVGSurface {

  constructor(props, context) {
    super(props, context);
  }

  onTouch(evt) {
    let [x, y] = [evt.nativeEvent.pageX, evt.nativeEvent.pageY];
    let newCurrentPoints = this.state.currentPoints;
    newCurrentPoints.push({x, y});

    this.setState({
      donePaths: this.state.donePaths,
      currentPoints: newCurrentPoints,
      currentMax: this.state.currentMax
    });
  }

  onResponderGrant(evt) {
    this.onTouch(evt);
  }

  onResponderMove(evt) {
    this.onTouch(evt);
  }

  onResponderRelease() {
    let newPaths = this.state.donePaths;
    if (this.state.currentPoints.length > 0) {
      // Cache the shape object so that we aren't testing
      // whether or not it changed; too many components?
      newPaths.push(
        <Shape
          key={this.state.currentMax}
          d={pointsToSvg(this.state.currentPoints)}
          stroke="#FFFFFF"
          strokeWidth={8}
        />
      );
    }
    this.props.reaction.addGesture(this.state.currentPoints);
    this.setState({
      donePaths: newPaths,
      currentPoints: [],
      currentMax: this.state.currentMax + 1,
    });
  }
}

module.exports = SVGDrawSurface;