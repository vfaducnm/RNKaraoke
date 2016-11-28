import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

class KaraokeList extends Component {
  constructor(props){
    super(props);
    this.state = {text:""}
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
              style={{marginTop: 55, height: 45, borderColor: 'gray', borderWidth: 6, alignSelf: 'stretch',}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text} />
        <Text style={{top: 150}}>This is PageOne!</Text>
      </View>
    )
  }
}
module.exports = KaraokeList;
