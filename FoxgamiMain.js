'use strict';

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
        <Text style={styles.medium}>{story.title}</Text>
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
  icon: {
    alignItems: 'center',
    width: 32,
    height: 32,
    margin: 8,
    marginTop: 24,
  },
  storyImage: {
    flex: 1,
    alignItems: 'center',
    height: 374,
    width: 374,
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
    fontSize: 12,
    color: '#eeeeee',
  },
  medium: {
    fontSize: 15,
    margin: 12,
    color: '#eeeeee',
  },
  large: {

  }
});

module.exports = FoxgamiMain;