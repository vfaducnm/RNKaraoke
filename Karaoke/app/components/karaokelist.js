import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ListView,
  ActivityIndicator
} from 'react-native';

var SQLite = require('react-native-sqlite-storage');
var GiftedListView = require('react-native-gifted-listview');

var db;
var listData = new Array();
var ds;
var that;

// TEST Start
var RCTUIManager = require('NativeModules').UIManager;
//TEST END

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
      isLoading: true
    }

  }

  componentDidMount() {
    // this.loadData();

  }

  loadData(page = 1, callback) {
    var limit = 15;
    var offset = (page - 1) * limit;


    db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tblDanhSachBaiHat LIMIT ' + limit + ' OFFSET ' + offset, [] , (tx, results) => {
        console.log('Query completed');

        var len = results.rows.length;
        var data = [];

        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          
          data.push(row);
      
        }

        if (callback) {
          callback(data);
        }

        this.setState({
          // dataSource: ds.cloneWithRows(listData),
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

  renderRow(property) {
    console.log('property',property);
    return(
      <View style = {{marginTop: 10}}>
        <Text>
          {property.id} - {property.title}
        </Text>
      </View>
    );
  }

// Cuong BK START
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <TextInput
  //             style={{marginTop: 55, height: 45, borderColor: 'gray', borderWidth: 6, alignSelf: 'stretch',}}
  //             onChangeText={(text) => this.setState({text})}
  //             value={this.state.text} />

        
  //         {this.state.isLoading ? <ActivityIndicator size='large' style={styles.container}/> :
  //           <ListView 
  //             style = {{marginTop: 50}}
  //             dataSource = {this.state.dataSource}
  //             renderRow ={this.renderRow}
  //             initialListSize={12}
  //           />

  //         }
  //     </View>
  //   )
  // }
  // Cuong BK END
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
             rowHasChanged={(r1,r2)=>{
             r1.id !== r2.id
        }}
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
    fontSize: 20,
    textAlign: 'center',
    margin: 40,
  },
});

module.exports = KaraokeList;
