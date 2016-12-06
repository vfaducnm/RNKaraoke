import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from 'react-native';
import { Actions, Scene, Router} from 'react-native-router-flux';
import KaraokeList from '../app/components/karaokelist.js';
import FavoriteList from '../app/components/favoritelist.js';

const App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="tabbar"
          tabs={true}
          tabBarStyle={{ backgroundColor: '#FFFFFF',
                          ...Platform.select({
                            ios: {
                              top: 110,
                            },
                            android: {
                              top: 100,
                            },
                          }),
                          height: 50,
                          padding: 16, }} >
            <Scene key="osu" title="Karaoke List" icon={TabIcon}>
              <Scene key="list"
              component={KaraokeList}
              title="Karaoke"
              />
            </Scene>
            <Scene key="fav" title="Favorite List" icon={TabIcon}>
              <Scene key="favorite"
              component={FavoriteList}
              title="Karaoke"
              />
            </Scene>
        </Scene>
      </Scene>
    </Router>
  );
}

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'blue' :'black'}}>{title}</Text>
  );
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
