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


let FoxgamiApi = require('FoxgamiApi');

let FoxgamiStory = require('./FoxgamiStory');
let FoxgamiNav = require('./FoxgamiNav');
let SignupLogin = require('./SignupLogin');
let {Colors} = require('./BaseStyles');

StatusBarIOS.setHidden(true);

class FoxgamiMain extends React.Component {

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

  _selectStory(story) {
    this.props.navigator.push({
      title: story.title,
      component: FoxgamiStory,
      passProps: {story: story}
    });
  }

  _renderStory(story) {
    return (
      <View>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => this._selectStory(story)}>
          <Image
            style={styles.storyImage}
            source={{uri: story.image_url}}
          />
        </TouchableHighlight>
        <Text style={[styles.medium, styles.baseText]}>{story.title}</Text>
        <Text style={[styles.small, styles.baseText]}>posted {timeago(story.submitted_at)}</Text>
      </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.feed}>
          <FoxgamiNav/>
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
  storyImage: {
    height: 375,
    width: 375,
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
  },
});

module.exports = FoxgamiMain;