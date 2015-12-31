/**
 * @providesModule StoryDrawingHeader
 */

let React = require('react-native');
let {
  View,
  StyleSheet
} = React;

let IconButton = require('IconButton');


class StoryDrawingHeader extends React.Component {

  saveAndStop() {
    this.props.onPressSave();
    this.props.onPressStop();
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconButton
            onPress={this.props.onPressStop}
            source={require('../images/Cancel.png')}
            />
        </View>
        <View style={styles.headerRight}>
          <IconButton
            onPress={this.props.onPressUndo}
            source={require('../images/Undo.png')}
            />
          <IconButton
            onPress={this.saveAndStop.bind(this)}
            source={require('../images/Done.png')}
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({

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
  }

});

module.exports = StoryDrawingHeader