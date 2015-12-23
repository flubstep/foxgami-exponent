/**
 * @providesModule StoryFeedItem
 */

'use strict';

let timeago = require('timeago');
let React = require('react-native');
let {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  StatusBarIOS,
  TouchableHighlight,
  Modal
} = React;


let {Colors} = require('BaseStyles');
let FoxgamiApi = require('FoxgamiApi');

let StoryScreen = require('StoryScreen');
let IconButton = require('IconButton');

class StoryFeedItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      numReactions: 0
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    FoxgamiApi.subscribeReaction(this.props.story.id, (reactions) => {
      let numReactions = reactions.length;
      this.setState({
        numReactions
      });
    });
  }

  _doNothing() {

  }

  _selectStory() {
    this.props.navigator.push({
      title: this.props.story.title,
      component: StoryScreen,
      passProps: {story: this.props.story}
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => this._selectStory(this.props.story)}>
          <Image
            style={styles.storyImage}
            source={{uri: this.props.story.image_url}}
          />
        </TouchableHighlight>
        <Text style={[styles.medium, styles.baseText]}>{this.props.story.title}</Text>
        <View style={styles.storyRow}>
          <View style={styles.storyRowInfo}>
            <Text style={[styles.small, styles.baseText]}>{this.state.numReactions} reactions</Text>
          </View>
          <View style={styles.storyRowIcons}>
            <IconButton
              onPress={this._doNothing.bind(this)}
              source={require('../images/ShareGray.png')}
              />
            <IconButton
              onPress={this._doNothing.bind(this)}
              source={require('../images/SmilieGray.png')}
              />
            <IconButton
              onPress={this._doNothing.bind(this)}
              source={require('../images/LikeGray.png')}
              />
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Gill Sans',
  },
  storyImage: {
    height: 375,
    width: 375,
  },
  xsmall: {
    fontSize: 10,
    color: Colors.dark,
  },
  small: {
    fontSize: 13,
    color: Colors.subdued,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 24,
  },
  medium: {
    fontSize: 16,
    margin: 12,
    marginBottom: 6,
    color: Colors.dark,
  },
  storyRow: {
    marginTop: 4,
    width: 375 - (12*2),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  storyRowIcons: {
    flexDirection: 'row'
  },
  storyRowInfo: {

  }
});

module.exports = StoryFeedItem;