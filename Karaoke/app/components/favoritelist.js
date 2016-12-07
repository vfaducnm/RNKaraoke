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
} from 'react-native';
import { Actions } from 'react-native-router-flux';
var SQLite = require('react-native-sqlite-storage');
var GiftedListView = require('react-native-gifted-listview');
var db;
var ds;
var that;
var data = [];
var favList = {};
var wStar = require('../../image/whiteStar.png');
var star = require('../../image/star.png');

var giftList;

export class FavoriteList extends Component {
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


  componentWillUpdate() {
   this.loadData(1, (data) => {
    var newData = JSON.parse(JSON.stringify(data));
    giftList._setPage(1);
    giftList._updateRows(data);
   });
  }

  //Test End

  loadData(page = 1, callback) {
    var limit = 13;
    var offset = (page - 1) * limit;

    if (page == 1) data = [];

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tblDanhSachBaiHat WHERE favorite = 1  LIMIT ' + limit + ' OFFSET ' + offset, [] , (tx, results) => {
        // console.log('Query completed');

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

  onFetch(page = 1, callback, options) {
    that.loadData(page, (rows) => {
      if (rows.length < 13) {
        callback(rows, {
          allLoaded: true // the end of the list is reached
        });
      } else {
        callback(rows);
      }
    });

  }

  addFavorite(giftedListView, id) {
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

    giftedListView._updateRows(newData);

  }

  loadImage(id) {
    if (favList[id]) {
      return star;
    } else {
      return wStar;
    }
    
  }

  updateData(updateData) {
    db.transaction((tx) => {
      tx.executeSql('UPDATE tblDanhSachBaiHat SET favorite ='+ updateData.favorite +'  WHERE id = ' + updateData.id
                      , [] , (tx, results) => {
        // console.log('Query completed');
      });
    },(err) =>{
       console.log('transaction error: ', err.message);
    });
    
  }

  renderRow(property) {
    giftList = this;

    return(
      <View style = {{marginTop: 10, flexDirection: 'row',flex: 1,}}>
        <Text style ={{marginLeft: 10, }}>
          {property.id} 
        </Text>
        <Text style = {{marginLeft: 20,flex: 1,color:'blue', }}>
          {property.title}
        </Text>
        <View>
          <TouchableOpacity
            onPress={that.addFavorite.bind(that, this, property.id)}>
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
   var textSearch = event.nativeEvent.text.toLowerCase()
   this.setState({searchText: textSearch, forceUpdate: true})
  }

  render() {
    return (
      <View style={styles.container}>
      <TextInput
              style={{...Platform.select({
                          ios: {top:65},
                          android: {top: 55},}),
                      height: 45,
                      borderColor: '#e5e5e5',
                      borderWidth: 6,
                      alignSelf: 'stretch',}}
              onChangeText={this.onSearchChange.bind(this)}
              value={this.state.text} />


        <GiftedListView
            style = {{...Platform.select({
                        ios: {marginTop:120,alignSelf:'stretch',},
                        android: {marginTop: 110,alignSelf:'stretch'},})}}

            rowView ={this.renderRow}
            onFetch = {this.onFetch}
            initialListSize={10}
            firstLoader={true} // display a loader for the first fetching
            pagination={true} // enable infinite scrolling using touch to load more
            refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
            withSections={false} // enable sections
            enableEmptySections = { true }
            rowHasChanged={ (row1, row2) => { row1 !== row2 || row1.favorite != row2.favorite }}
          />

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

module.exports = FavoriteList;
