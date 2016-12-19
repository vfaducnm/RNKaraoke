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
  Picker
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
      lang: 'en',
      songName: '',
      author: '',
      lyric: ''
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
    } else if(this.state.lang == ''){
      Alert.alert(
            'Error',
            'Please type song language',
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
        <View style={stylesCSS.addSongView}>
          <Text>Lang(*): </Text>
          <Picker
            style={{ marginLeft: 30,flex: 0.9,height: 50, borderColor: 'gray', borderWidth: 1}}
            selectedValue={this.state.lang}
            onValueChange={(language) => this.setState({lang: language})}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Vietnamese" value="vi" />
          </Picker>
        </View>
        
        <View style={stylesCSS.addSongView}>
          <Text>Id(*): </Text>
          <TextInput
            style={{ marginLeft: 30,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(id) => this.setState({id})}
            value={this.state.id}
            keyboardType='numeric'
          />
        </View>

        <View style={stylesCSS.addSongView}>
          <Text>Song name(*): </Text>
          <TextInput
            style={{ marginLeft: 10,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(songName) => this.setState({songName})}
            value={this.state.songName}
          />
        </View>

        <View style={stylesCSS.addSongView}>
          <Text>Author: </Text>
          <TextInput
            style={{ marginLeft: 30,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(author) => this.setState({author})}
            value={this.state.author}
          />
        </View>

        <View style={stylesCSS.addSongView}>
          <Text>Lyric: </Text>
          <TextInput
            style={{ marginLeft: 30,flex: 0.9,height: 30, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(lyric) => this.setState({lyric})}
            value={this.state.lyric}
          />
        </View>

        <View style={{backgroundColor:'#e5e5e5'}}>
          <TouchableOpacity
            onPress = {this.checkField.bind(this,this.state)}>
            <Text> Add Song </Text>
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
  }
});

module.exports = InsertSong;
