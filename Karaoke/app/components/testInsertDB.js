import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

var wStar = require('../../image/whiteStar.png');
var star = require('../../image/star.png');
const stylesCSS = require('../stylesCSS.js');
var SQLite = require('react-native-sqlite-storage');
var db;
var favorite = 0;
export class InsertSong extends Component {
  constructor(props){
    super(props);
    this.state = { 
      id: '',
      lang: '',
      songName: '',
      author: '',
      lyric: ''
    };

    db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);
    console.log(this.props)
  }

  

  insertDB(objectSong) {
    db.transaction( (tx) => {
        tx.executeSql(" INSERT INTO tblDanhSachBaiHat values ("
                        + objectSong.id +',' 
                        +"'"+ objectSong.songName+"'" +',' 
                        +"'"+ objectSong.songName +"'" +',' 
                        +"'"+ objectSong.lang +"'" + ',' 
                        +"'"+ objectSong.lyric +"'" + ',' 
                        +"'"+ objectSong.author +"'" + ','
                        +"'"+ favorite +"'" +
                        ")" , [], (tx, results) =>{
          console.log('Query completed');
        });
      },(err) =>{
       console.log('transaction error: ', err.message);
    });

    this.setState({
      id: '',
      lang: '',
      songName: '',
      author: '',
      lyric: ''
    });

  }


  render() {
    return (
      <View style={stylesCSS.contentAddSong}>
        <View style={stylesCSS.addSongView}>
          <Text style={{marginTop: 20}} >Lang: </Text>
          <TextInput
            style={{ marginLeft: 30,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(lang) => this.setState({lang})}
            value={this.state.lang}
          />
        </View>
        <View style={stylesCSS.addSongView}>
          <Text style={{marginTop: 20}} >Id: </Text>
          <TextInput
            style={{ marginLeft: 30, marginTop: 20,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(id) => this.setState({id})}
            value={this.state.id}
          />
        </View>
        <View style={stylesCSS.addSongView}>
          <Text style={{marginTop: 20}}>Song name: </Text>
          <TextInput
            style={{ marginLeft: 10, marginTop: 20,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(songName) => this.setState({songName})}
            value={this.state.songName}
          />
        </View>
        <View style={stylesCSS.addSongView}>
          <Text style={{marginTop: 20}}>Author: </Text>
          <TextInput
            style={{ marginLeft: 30, marginTop: 20, flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(author) => this.setState({author})}
            value={this.state.author}
          />
        </View>
        <View style={stylesCSS.addSongView}>
          <Text style={{marginTop: 20}}>Lyric: </Text>
          <TextInput
            style={{ marginLeft: 30, marginTop: 20 ,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(lyric) => this.setState({lyric})}
            value={this.state.lyric}
          />
        </View>
        
        <View>
          <TouchableOpacity
            onPress = {this.insertDB.bind(this,this.state)}
          >
            <Text style={styles.button} > 
              Add Song
            </Text>
          </TouchableOpacity>
        </View>
         
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
  id: {
   
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
  starIcon: {
    width: 30, 
    height: 30, 
    margin: 15
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor:'#e5e5e5'
  },
});

module.exports = InsertSong;
