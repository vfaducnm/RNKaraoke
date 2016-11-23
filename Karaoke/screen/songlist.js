import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import { Header, InputGroup, Icon, Button } from 'native-base';

export class SongList extends Component {
  search(){
    console.log('You press search');
  }
  render() {
    return (
      <Header searchBar rounded>
          <InputGroup>
              <Icon name="ios-search" />
              <Input placeholder="Search" value={this.state.search}  onChangeText={(text) => this.setState({search:text})} onSubmitEditing={()=>this.search()}/>
          </InputGroup>
          <Button transparent onPress={()=>this.search()}>Go</Button>
      </Header>
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
