/**
 * @providesModule StoryFeedScreen
 */

'use strict';

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
let timeago = require('timeago');

let StoryScreen = require('StoryScreen');
let SignupLoginScreen = require('SignupLoginScreen');
let ProfileScreen = require('ProfileScreen');
let NavigationBar = require('NavigationBar');
let StoryFeedItem = require('StoryFeedItem');
let ShareStoryModal = require('ShareStoryModal');
let ShareIconWheel = require('ShareIconWheel');

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
      currentUser: null,
      shareActive: false,
      shareButtonX: 0,
      shareButtonY: 0
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

    FoxgamiApi.subscribeSharing((state) => {
      this.setState({
        shareActive: state.active,
        shareButtonX: state.shareButtonX,
        shareButtonY: state.shareButtonY
      });
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
          flex: 1,
          width: this.state.visibleWidth,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <RefreshableListView.RefreshingIndicator />
      </View>
    );
  }

  updateShareWheelPosition() {
    FoxgamiApi.dismissSharing();
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
            onScroll={this.updateShareWheelPosition.bind(this)}
          />
        </View>
        <ShareIconWheel
          visible={this.state.shareActive}
          shareTargets={[1, 2, 3, 4, 5, 6]}
          baseX={this.state.shareButtonX}
          baseY={this.state.shareButtonY}
        />
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
  },
  background: {
    flex: 1,
    justifyContent: 'center'
  }
});

module.exports = StoryFeedScreen;