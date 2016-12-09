import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

export class SongDetail extends Component {
  constructor(props){
    super(props);
    this.state = {text: ""};

    console.log(this.props)
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.detailData.id}
        </Text>
        <Text style={styles.welcome}>
          {this.props.detailData.title}
        </Text>
        <Text style={styles.instructions}>
          {this.props.detailData.lyric}
        </Text>
        <Text style={styles.intructions}>
         {this.props.detailData.source}
        </Text>
        <Image
          source={{uri:'https://cdn2.iconfinder.com/data/icons/crystalproject/crystal_project_256x256/apps/keditbookmarks.png'}}
          style={{width: 30, height: 30, margin: 15}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 15,
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333333',
    margin: 15,
  },
  searchBar: {
    height: 50,
    borderColor: '#e5e5e5',
    borderWidth: 6,
    alignSelf: 'stretch',
  },
});

module.exports = SongDetail;
