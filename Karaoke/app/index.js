import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform

} from 'react-native';
import { Actions, Scene, Router, ActionConst, Reducer} from 'react-native-router-flux';
import ActionButton from 'react-native-action-button';
import KaraokeList from '../app/components/karaokelist.js';
import FavoriteList from '../app/components/favoritelist.js';
import SearchResult from '../app/components/searchresult.js';
import SongDetail from '../app/components/songdetail.js';

// import InsertSong from '../app/components/testInsertDB.js'

import InsertSong from '../app/components/addsong.js';

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
          tabBarStyle={{ backgroundColor:'#efeff2',
                          ...Platform.select({
                            ios: {
                              top: 110,
                            },
                            android: {
                              top: 100,
                            },
                          }),
                          height: 50, }}
            tabBarSelectedItemStyle={{backgroundColor: '#E88F4F'}} >

            <Scene key="kara" title="Karaoke List" icon={TabIcon}
              onPress={()=> {
                Actions.list({type: ActionConst.REFRESH});

              }}>
              <Scene key="list"
                component={KaraokeList}
                title="Karaoke"
              />

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

        <Scene
          key="search"
          component={SearchResult}
          title="Search Result"
          hideTabBar={true}/>

        <Scene
          key="songDetail"
          component={SongDetail}
          title="Song Detail"
          hideTabBar={true} />

        <Scene
          key="addSong"
          component={InsertSong}
          title="Add Song"
          hideTabBar={true} />
      </Scene>
    </Router>
  );
}


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{fontSize: 17, fontWeight: 'bold', color: selected ? 'blue' :'black'}}>{title}</Text>
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
