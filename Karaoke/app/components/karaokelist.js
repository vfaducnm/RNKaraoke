import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Image, 
  TextInput,
  ListView,
  ActivityIndicator,
  Alert
} from 'react-native';

var SQLite = require('react-native-sqlite-storage');
var GiftedListView = require('react-native-gifted-listview');

var db;

var ds;
var that;
var data = [];
var allRow = {};
var favList = {};
var wStar = require('../../image/whiteStar.png');
var star = require('../../image/star.png');

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

    this.state = {
      text:"",
      isLoading: true,
      // starIcon: require('../../image/whiteStar.png')
    }

  }

  componentDidMount() {
    // this.loadData();

  }

  loadData(page = 1, callback) {
    var limit = 15;
    var offset = (page - 1) * limit;

    if (page == 1) data = [];

    db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tblDanhSachBaiHat LIMIT ' + limit + ' OFFSET ' + offset, [] , (tx, results) => {
        console.log('Query completed');

        var len = results.rows.length;
      
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);

          if (!favList[row.id]) {
            row.fav = false;
            favList[row.id] = false;
          } else {
            row.fav = true;
          }
          
          data.push(row);
      
        }

        console.log(data);

        if (callback) {
          callback(data);
        }

        this.setState({
          isLoading: false
        });

        // console.log('asdasdas', this.state.dataSource);
      
      });
    });
  }


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

  addFavorite(giftedListView, id) {
    console.log('add favou');

    favList[id] = !favList[id];

    var newData = JSON.parse(JSON.stringify(data));

    for (var i=0; i<newData.length; i++) {
      if (newData[i].id == id) {
        newData[i].fav = favList[id];
        break;
      }
    }

    // console.log(newData);

    giftedListView._updateRows(newData);
  }

  loadImage(id) {
    console.log('load image');
    var fav = favList[id];

    if (fav) {
      return star;
    } else {
      return wStar;
    }
  }

  renderRow(property) {
    console.log('property',property);
    console.log('render');

    return(
      <View style = {{marginTop: 10, flexDirection: 'row'}}>
        <Text style ={{marginLeft: 10}}>
          {property.id} 
        </Text>
        <Text style = {{marginLeft: 20,textAlign:'center',color:'red'}}>
          {property.title}
        </Text>
        <View style ={{marginLeft: 100}}>
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

  render() {

    return (
      <View style={styles.container}>
        <TextInput
              style={{marginTop: 55, height: 45, borderColor: 'gray', borderWidth: 6, alignSelf: 'stretch',}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text} />

          <GiftedListView 
            style = {{marginTop: 50}}
            rowView ={this.renderRow}
            onFetch = {this.onFetch}
            initialListSize={15}
            firstLoader={true} // display a loader for the first fetching
            pagination={true} // enable infinite scrolling using touch to load more
            refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
            withSections={false} // enable sections
            enableEmptySections = { true }
            
          />
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 30,
  },
  listView: {
    flex: 1,
    alignSelf:'stretch',
    marginTop: 50,
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
    width:30,
    height:30,
   
  },
});

module.exports = KaraokeList;
