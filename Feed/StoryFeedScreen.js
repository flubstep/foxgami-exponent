/**
 * @providesModule StoryFeedScreen
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
let SignupLoginScreen = require('SignupLoginScreen');
let NavigationBar = require('NavigationBar');
let StoryFeedItem = require('StoryFeedItem');

StatusBarIOS.setHidden(true);

class StoryFeedScreen extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    FoxgamiApi.get('/stories')
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  }

  _renderStory(story) {
    return (
      <StoryFeedItem story={story} navigator={this.props.navigator} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.feed}>
          <NavigationBar navigator={this.props.navigator} showUser={true}/>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderStory.bind(this)}
          />
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    flex: 1,
  },
  feed: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 6,
    flex: 1,
  },
  baseText: {
    fontFamily: 'Gill Sans',
  },
  logo: {
    color: Colors.white,
    fontSize: 15,
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
  }
});

module.exports = StoryFeedScreen;