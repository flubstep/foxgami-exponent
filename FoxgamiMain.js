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
} = React;

let REQUEST_URL = 'http://www.foxgami.com/api/stories';

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
    fetch(REQUEST_URL)
      .then((response) => response.json())
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
      <View>
        <Image
          style={styles.storyImage}
          source={{uri: story.image_url}}
        />
        <Text style={[styles.medium, styles.baseText]}>{story.title}</Text>
        <Text style={[styles.small, styles.baseText]}>posted {timeago(story.submitted_at)}</Text>
      </View>
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={{uri: "http://www.foxgami.com/client/resources/logo_large.png"}}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderStory}
          style={styles.small}
        />
      </View>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  baseText: {
    fontFamily: 'Gill Sans'
  },
  icon: {
    alignItems: 'center',
    width: 32,
    height: 32,
    margin: 8,
    marginTop: 24,
  },
  storyImage: {
    height: 384,
    width: 384,
  },
  logo: {
    color: '#eeeee',
    fontSize: 15,
  },
  xsmall: {
    fontSize: 10,
    color: '#eeeeee',
  },
  small: {
    fontSize: 13,
    color: '#565656',
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 24,
  },
  medium: {
    fontSize: 16,
    margin: 12,
    marginBottom: 6,
    color: '#eeeeee',
  },
  large: {

  }
});

module.exports = FoxgamiMain;