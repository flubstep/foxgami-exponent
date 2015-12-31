/**
 * @providesModule StoryPlayingHeader
 */

let React = require('react-native');
let {
  View,
  StyleSheet
} = React;

let IconButton = require('IconButton');

class StoryPlayingHeader extends React.Component {

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <IconButton
            onPress={this.props.onPressBack}
            source={require('../images/Pulldown.png')}
            />
        </View>
        <View style={styles.headerRight}>
          <IconButton
            onPress={this.props.onPressDraw}
            source={require('../images/Smilie.png')}
            />
          <IconButton
            onPress={this.props.onPressShare}
            source={require('../images/Share.png')}
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

module.exports = StoryPlayingHeader