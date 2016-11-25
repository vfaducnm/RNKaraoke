import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import { Actions, Scene, Router} from 'react-native-router-flux';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF' }} >
            <Scene key="osu" title="Karaoke List" icon={TabIcon}>
              <Scene key="list"
              component={PageOne}
              title="Karaoke"
              />
            </Scene>
            <Scene key="fav" title="Favorite List" icon={TabIcon}>
              <Scene key="favorite"
              component={PageTwo}
              title="Favorite"
              />
            </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

const ListSong = () => {
  this.state = {text: ""};
  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 45, borderColor: 'gray', borderWidth: 6, alignSelf: 'stretch',}}  />
      <Text
        style={styles.welcome} >
        This is list song
      </Text>
    </View>
  );
}

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'blue' :'black'}}>{title}</Text>
  );
}

const BookmarkList = () => {
  this.state={text: ""};
  return (
    <View style={styles.container}>
      <TextInput
        style={{height: 45, borderColor: 'gray', borderWidth: 6, alignSelf: 'stretch',}} />
      <Text style={styles.welcome} >
        Favorite layout
      </Text>
    </View>
  );
}

export class PageOne extends Component {
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
        <Text>This is PageOne!</Text>
      </View>
    )
  }
}

export class PageTwo extends Component {
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
        <Text>This is PageTwo!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 40,
  },
});

export default App;
