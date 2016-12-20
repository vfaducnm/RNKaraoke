import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Picker,
  Platform
} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var wStar = require('../../image/whiteStar.png');
var star = require('../../image/star.png');
const stylesCSS = require('../stylesCSS.js');
var SQLite = require('react-native-sqlite-storage');
var db;
var favorite = 0;

var radio_props = [
  {label: 'English', value: 0 },
  {label: 'Vietnamese', value: 1 }
];


export class InsertSong extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: '',
      lang: 'en',
      songName: '',
      author: '',
      lyric: '',
      value: 0
    };

    db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);

    console.log(this.props)
  }

  insertDB(objectSong) {
    console.log('lang',objectSong.lang);
    console.log('id',objectSong.id);
    console.log('songName',objectSong.songName);
    console.log('author',objectSong.author);
    console.log('lyric',objectSong.lyric);

    db.transaction( (tx) => {
        tx.executeSql(' select id from tblDanhSachBaiHat where id = '
                        + objectSong.id , [], (tx, results) =>{
          console.log('results',results);
          if(results.rows.length == 1) {
            console.log('Ton tai');
            Alert.alert(
                'Error',
                'Song id exist',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed!')},
                ]
              );
          } else {
            console.log('Khong ton tai ')
            db.transaction( (x) => {
                x.executeSql(" INSERT INTO tblDanhSachBaiHat values ("
                                + objectSong.id +','
                                +"'"+ objectSong.songName+"'" +','
                                +"'"+ objectSong.songName +"'" +','
                                +"'"+ objectSong.lang +"'" + ','
                                +"'"+ objectSong.lyric +"'" + ','
                                +"'"+ objectSong.author +"'" + ','
                                +"'"+ favorite +"'" +
                                ")" , [], (x, results) =>{
                  console.log('Query completed');
                  Alert.alert(
                        '',
                        'Insert song completed!',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed!')},
                        ]
                      )
                    });
              },(err) =>{
               console.log('transaction error: ', err.message);
            });
          }

      },(err) =>{
         console.log('transaction error: ', err.message);
      });
    });

    this.setState({
      id: '',
      lang: 'en',
      songName: '',
      author: '',
      lyric: ''
    });

  }

  checkField(objectSong){
    if(this.state.id == ''){
      Alert.alert(
            'Error',
            'Please type song id',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
    } else if(this.state.songName == ''){
      Alert.alert(
            'Error',
            'Please type song name',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )
    } else {
      this.insertDB(objectSong)
    }
  }

  render() {
    return (
      <View style={stylesCSS.contentAddSong}>
        <Text style={stylesCSS.addSongTitle}>ID (*): </Text>
        <TextInput
          style={stylesCSS.addSongValue}
          onChangeText={(id) => this.setState({id})}
          value={this.state.id}
          keyboardType='numeric'
        />

          <Text style={stylesCSS.addSongTitle}>Song name (*): </Text>
          <TextInput
            style={stylesCSS.addSongValue}
            onChangeText={(songName) => this.setState({songName})}
            value={this.state.songName}
          />

          <Text style={stylesCSS.addSongTitle}>Author: </Text>
          <TextInput
            style={stylesCSS.addSongValue}
            onChangeText={(author) => this.setState({author})}
            value={this.state.author}
          />

          <Text style={stylesCSS.addSongTitle}>Lyrics: </Text>
          <TextInput
            style={stylesCSS.addSongValue}
            onChangeText={(lyric) => this.setState({lyric})}
            value={this.state.lyric}
          />

        <View style={styles.btnView} >
          <TouchableOpacity
            onPress = {this.checkField.bind(this,this.state)}>
            <Text style={styles.addSong}> Add Song </Text>
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
  btnView: {
    ...Platform.select({
                          ios: { flex: 1,},
                          android: {flex: 1,}
                       }),
  },
  addSong: {
    ...Platform.select({
                          ios: {marginTop: 50},
                          android: {marginTop: 50,}
                       }),
    padding:10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'deeppink',
    textAlign: 'center',
    backgroundColor:'#e5e5e5'
  },
});

module.exports = InsertSong;
