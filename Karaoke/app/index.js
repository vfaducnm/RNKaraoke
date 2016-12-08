import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform

} from 'react-native';
import { Actions, Scene, Router, ActionConst, Reducer} from 'react-native-router-flux';
import KaraokeList from '../app/components/karaokelist.js';
import FavoriteList from '../app/components/favoritelist.js';
import SearchResult from '../app/components/searchresult.js';
import SongDetail from '../app/components/songdetail.js';

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);

  return (state, action) => {
    // console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};

const App = () => {
  return (
    <Router createReducer={reducerCreate} >
      <Scene key="root">
        <Scene
          key="tabbar"
          tabs={true}
          selector={() => { console.log('aaa'); }}
          tabBarStyle={{ backgroundColor: '#FFFFFF',
                          ...Platform.select({
                            ios: {
                              top: 110,
                            },
                            android: {
                              top: 50,
                            },
                          }),
                          height: 50,
                          padding: 16, }} >

            <Scene key="osu" title="Karaoke List" icon={TabIcon} 
              onPress={()=> {
                Actions.list({type: ActionConst.REFRESH});

              }}>
              <Scene key="list"
                component={KaraokeList}
                title="Karaoke"          
              />

              <Scene key="detail" 
                component={SearchResult} 
                title="Search Result" 
                hideNavBar={true} >
              </Scene>

              <Scene
                key="songDetail"
                component={SongDetail}
                title="Song Detail"
                hideNavBar={true} >
              </Scene>

            </Scene>
            <Scene key="fav" title="Favorite List" icon={TabIcon}
              onPress={()=> {
                Actions.favorite({type: ActionConst.REFRESH});
              }}>

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
