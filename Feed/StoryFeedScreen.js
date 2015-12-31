/**
 * @providesModule StoryFeedScreen
 */

'use strict';

let timeago = require('timeago');
let React = require('react-native');
let {
  AppRegistry,
  ActivityIndicatorIOS,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  ScrollView,
  StatusBarIOS,
  TouchableHighlight,
  Modal
} = React;

let RefreshableListView = require('react-native-refreshable-listview');

let {Colors} = require('BaseStyles');
let FoxgamiApi = require('FoxgamiApi');

let StoryScreen = require('StoryScreen');
let SignupLoginScreen = require('SignupLoginScreen');
let ProfileScreen = require('ProfileScreen');
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
      visibleWidth: Dimensions.get('window').width,
      currentUser: null
    }
  }

  componentDidMount() {
    // TODO: This should be under one state
    FoxgamiApi.subscribeStories((stories) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(stories),
        loaded: true
      });
    });

    FoxgamiApi.subscribeUser((user) => {
      this.setState({ currentUser: user });
    });

    FoxgamiApi.fetchStories();
    FoxgamiApi.fetchCurrentUser();
  }

  _showLogin() {
    this.props.navigator.push({
      title: "Signup",
      component: SignupLoginScreen
    });
  }

  _showProfile() {
    this.props.navigator.push({
      title: "Profile",
      component: ProfileScreen,
      passProps: { user: this.state.currentUser }
    });
  }

  _renderStory(story) {
    return (
      <StoryFeedItem story={story} navigator={this.props.navigator} />
    );
  }

  _renderRefreshIndicator(loadingIndicator) {

    return (
      <View style={{
          width: this.state.visibleWidth,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <RefreshableListView.RefreshingIndicator />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.feed}>
          <NavigationBar
            user={this.state.currentUser}
            showUser={true}
            onLogin={this._showLogin.bind(this)}
            onProfile={this._showProfile.bind(this)}
            height={24}
          />
          <RefreshableListView
            loadData={FoxgamiApi.refreshStories}
            dataSource={this.state.dataSource}
            renderRow={this._renderStory.bind(this)}
            refreshingIndictatorComponent={this._renderRefreshIndicator.bind(this)}
            onEndReached={FoxgamiApi.fetchStories}
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
    flex: 1
  }
});

module.exports = StoryFeedScreen;