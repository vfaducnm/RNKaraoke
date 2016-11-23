import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class SongDetail extends Component {
  render() {
    return (
      <View style={styles.container}>      
        <Text style={styles.welcome}>
          50051
        </Text>
        <Text style={styles.welcome}>
          Biển nhớ
        </Text>
        <Text style={styles.instructions}>
          Ngày mai em đi biển nhớ tên em gọi về...
        </Text>
        <Text style={styles.intructions}>
         Trịnh Công Sơn
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
});
