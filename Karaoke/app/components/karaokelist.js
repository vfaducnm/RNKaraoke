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
    db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);
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
    var limit = 13;
    var offset = (page - 1) * limit;

    if (page == 1) data = [];

    // db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tblDanhSachBaiHat LIMIT ' + limit + ' OFFSET ' + offset, [] , (tx, results) => {
        console.log('Query completed');

        var len = results.rows.length;
      
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);

          favList[row.id] = row.favorite;

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

        break;
      }
    }

    giftedListView._updateRows(newData);

  }

  loadImage(id) {
    console.log('========= load image =========');

    if (favList[id]) {
      return star;
    } else {
      return wStar;
    }
    
  }

  updateData(updateData) {
    // console.log("fav: " + fav , 'idUpd ' + idUpd.id);
    // TEST START
    db.transaction((tx) => {
      tx.executeSql('UPDATE tblDanhSachBaiHat SET favorite ='+ updateData.favorite +'  WHERE id = ' + updateData.id
                      , [] , (tx, results) => {
        console.log('Query completed');
      });
    },(err) =>{
       console.log('transaction error: ', err.message);
    });
    // TEST END
  }

  renderRow(property) {
    return(
      <View style = {{marginTop: 10, flexDirection: 'row',flex: 1,}}>
        <Text style ={{marginLeft: 10, }}>
          {property.id} 
        </Text>
        <Text style = {{marginLeft: 20,flex: 1,color:'red', }}>
          {property.title}
        </Text>
        <View style ={{ }}>
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
            style = {styles.listView}
            rowView ={this.renderRow}
            onFetch = {this.onFetch}
            initialListSize={10}
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
   
  },
});

module.exports = KaraokeList;
