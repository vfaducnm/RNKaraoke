import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
  ListView,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';

import GiftedListView from '../customGits/react-native-gifted-listview/';
import SearchResult from '../components/searchresult.js';
import SongDetail from '../components/songdetail.js';
import {Actions} from 'react-native-router-flux';
const stylesCSS = require('../stylesCSS.js');
var SQLite = require('react-native-sqlite-storage');
var db;
var ds;
var that;
var data = [];
var dataDetail = [];
var favList = {};
var wStar = require('../../image/whiteStar.png');
var star = require('../../image/star.png');
// import SearchResult from '../components/searchresult.js';

var giftList;

class KaraokeList extends Component {

  errorCB(err) {
  console.log("SQL Error: " + err);
  }

  successCB() {
    console.log("SQL executed fine");
  }

  openCB() {
    console.log("Database OPENED");
  }

  constructor(props){
    super(props);

    that = this;
    db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);
    this.state = {
      text:"",
      searchText: "",
      forceUpdate: false,
    }
  }

  /**
    Refresh row  
  **/
  componentWillUpdate() {
    console.log('kara will update');
    this.loadData(1, (data) => {
      giftList._setPage(1);

      var options = {};
      if (data.length < 13) {
        options.allLoaded = true;
      }

      giftList._updateRows(data, options);
    });

  }

  /**
    Load Data from DB
  **/
  loadData(page = 1, callback) {
    var limit = 13;
    var offset = (page - 1) * limit;

    if (page == 1) data = [];

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tblDanhSachBaiHat LIMIT ' + limit + ' OFFSET ' + offset, [] , (tx, results) => {
        console.log('Query completed');

        var len = results.rows.length;
        var _data = [];

        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);

          favList[row.id] = row.favorite;

          data.push(row);
          _data.push(row);

        }

        if (callback) {
          callback(_data);
        }

      });
    });
  }

  /**
    Use data render row in page   
  **/
  onFetch(page = 1, callback, options) {
    that.loadData(page, (rows) => {
      if (rows.length == 0) {
        callback(rows, {
          allLoaded: true // the end of the list is reached
        });
      } else {
        callback(rows);
      }
    });

  }

  /**
    Add favorite 
  **/
  addFavorite(id) {
    console.log('add favou');
    var newData = JSON.parse(JSON.stringify(data));
    for (var i=0; i<newData.length; i++) {
      if (newData[i].id == id) {

        if (newData[i].favorite) {
          newData[i].favorite = 0;
        } else {
          newData[i].favorite = 1;
        }

        favList[id] = newData[i].favorite;

        this.updateData(newData[i]);

        data[i].favorite = favList[id];

        break;
      }
    }

    giftList._updateRows(newData);

  }

  /**
    Change image 
  **/
  loadImage(id) {
    if (favList[id]) {
      return star;
    } else {
      return wStar;
    }

  }

  /**
    Update data to DB when choose favorite song
  **/
  updateData(updateData) {
    db.transaction((tx) => {
      tx.executeSql('UPDATE tblDanhSachBaiHat SET favorite ='+ updateData.favorite +'  WHERE id = ' + updateData.id
                      , [] , (tx, results) => {
        console.log('Query completed');
      });
    },(err) =>{
       console.log('transaction error: ', err.message);
    });

  }

  /**
    Show detail song
  **/
  showDetailSong(id) {
    // Alert.alert('Song Id: ', id.toString());
    // console.log('showDetailSong '+id,data);
    for (var i = 0; i < data.length; i++) {
      if(data[i].id === id) {
        dataDetail = data[i];
        Actions.songDetail({detailData: dataDetail});
      }
    }
    // console.log(dataDetail);

  }

  renderRow(property) {
    return(
      <View style = {{marginTop: 10, flexDirection: 'row',flex: 1,alignSelf:'stretch'}}>
        <View style ={{marginLeft: 10}}>
          <Text >
            {property.id}
          </Text>
        </View>
        <View style ={{flex: 1}}>
          <TouchableOpacity 
            onPress={that.showDetailSong.bind(that,property.id)}>
            <Text style = {{marginLeft: 20,flex: 1,color:'blue', }}>
              {property.title}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={that.addFavorite.bind(that, property.id)}>
            <Image
              style={styles.starIcon}
              source={that.loadImage(property.id)}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onSearchChange (event) {
   console.log(event.nativeEvent.text);
   this.setState({searchText: event.nativeEvent.text.toLowerCase(), forceUpdate: true})
  }

  render() {
    return (
      <View style={styles.container}>
        <View  
              style={ stylesCSS.searchView
                      //  ...Platform.select({
                      // ios: {flex:1, flexDirection: 'row'},
                      // android: {flex:1 ,height:100,flexDirection: 'row'}
                      // }),
                    }>
          <View 
                style={ stylesCSS.textInputView
                        // ...Platform.select({
                        //   ios: {flex:1/2},
                        //   android: {flex:1/2}
                        // }),
                      }>
            <TextInput
                style={ stylesCSS.textInput  
                          // ...Platform.select({
                          //   ios: {top:65},
                          //   android: {top: 55}}),
                          // height: 45,
                          // borderColor: '#e5e5e5',
                          // borderWidth: 6,
                          // textAlign: 'center',  
                        }
                onChangeText={(text) => {this.setState({text});}}
                value={this.state.text}
                placeholder = "Search" />
            </View> 
            <View 
                style={ stylesCSS.btnSearch
                          // ...Platform.select({
                          //   ios: {top:65, height:45,},
                          //   android: {top: 45, height:50,alignSelf: 'stretch',}}),
                          // alignItems: 'flex-end', 
                          // backgroundColor:'#e5e5e5',
                          // justifyContent: 'flex-end',
                            // backgroundColor:'red'
                      } >  
              <TouchableOpacity
                  onPress={()=> Actions.search({data: this.state.text, favorite: 0})}>
                  <Image
                    source={require('../../image/ic_search.png')}
                    style={{width: 30, height: 30, margin: 15}}
                  />
                </TouchableOpacity>  
            </View>
          </View>
          <GiftedListView
            style = { stylesCSS.listView
                        // ...Platform.select({
                        //   ios: {marginTop:160},
                        //   android: {marginTop:31}}),
                        // alignSelf:'stretch',
                    }
            rowView ={this.renderRow}
            onFetch = {this.onFetch}
            initialListSize={10}
            firstLoader={true} // display a loader for the first fetching
            pagination={true} // enable infinite scrolling using touch to load more
            refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
            withSections={false} // enable sections
            enableEmptySections = { true }
            rowHasChanged={ (row1, row2) => {
              return (row1 !== row2 || row1.favorite != row2.favorite);
            }}
            refreshContext = {(context) => { giftList = context }}
          />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 30,
  },
  listView: {
    flex: 1,
    alignSelf:'stretch',
    marginTop: 45,
    backgroundColor: '#ffffff',
  },
  songName:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    marginLeft:30,
  },
  marginItem:{
    flexDirection:'row',
    marginLeft:10,
    marginRight:10,
    marginBottom:5,
    height:20,
    justifyContent:'space-between',
    alignItems:'flex-start',
  },
  starIcon:{
    width:25,
    height:25,
    marginRight:15
  },
});

module.exports = KaraokeList;
