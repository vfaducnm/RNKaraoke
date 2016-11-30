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
var db;
var listData = new Array();
var ds;

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

    ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    this.state = {
      text:"",
      isLoading: true,
      // listItems: [],
       dataSource: ds.cloneWithRows(listData),
    }

    
    
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    db = SQLite.openDatabase({name : 'karaoke_db.sqlite', createFromLocation : 1},this.openCB, this.errorCB);
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tblDanhSachBaiHat ', [] , (tx, results) => {
        console.log('Query completed');
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          
          listData.push(row);
      
        }

        this.setState({
          dataSource: ds.cloneWithRows(listData),
          isLoading: false,
        });

        // console.log('asdasdas', this.state.dataSource);
      
      });
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

  render() {
    return (
      <View style={styles.container}>
        <TextInput
              style={{marginTop: 55, height: 45, borderColor: 'gray', borderWidth: 6, alignSelf: 'stretch',}}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text} />

        
          {this.state.isLoading ? <ActivityIndicator size='large' style={styles.container}/> :
            <ListView 
              style = {{marginTop: 50}}
              dataSource = {this.state.dataSource}
              renderRow ={this.renderRow}
              initialListSize={12}
            />

          }
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
