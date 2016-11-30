import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image
} from 'react-native';

var testData =[
  {id: '55477', name:'Anh Ba Khia'},
  {id: '55950', name:'Cau Vong Sau Mua'},
  {id: '57200', name:'Em La Cua Anh'},
  {id: '50159', name:'Con Duong Mua'},
  {id: '50447', name:'Gia Nhu Em Co The'},
  {id: '55477', name:'Anh Ba Khia'},
  {id: '55950', name:'Cau Vong Sau Mua'},
  {id: '57200', name:'Em La Cua Anh'},
  {id: '50159', name:'Con Duong Mua'},
  {id: '50447', name:'Gia Nhu Em Co The'},
  {id: '55477', name:'Anh Ba Khia'},
  {id: '55950', name:'Cau Vong Sau Mua'},
  {id: '57200', name:'Em La Cua Anh'},
  {id: '50159', name:'Con Duong Mua'},
  {id: '50447', name:'Gia Nhu Em Co The'},
  {id: '50447', name:'Gia Nhu Em Co The'},
  {id: '55477', name:'Anh Ba Khia'},
  {id: '55950', name:'Cau Vong Sau Mua'},
  {id: '57200', name:'Em La Cua Anh'},
  {id: '50159', name:'Con Duong Mua'},
  {id: '50447', name:'Gia Nhu Em Co The'},
];


class KaraokeList extends Component {
  constructor(props){
    super(props);
    this.state = {text:""};
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(testData),
    };
  }


renderRow(property){
  return(
    <View style={styles.marginItem}>
      <Text style={[styles.marginSongId]}>
       {property.id}
       </Text>

       <View style={styles.songName}>
       <Text style={{textAlign:'right'},{color:'red'}}>
       {property.name}
       </Text>
       </View>

<TouchableOpacity
onPress={() =>
              ToastAndroid.show('Add to Favorite', ToastAndroid.SHORT)}>
      <Image
      style={styles.starIcon}
      source={{uri: 'http://www.iconsdb.com/icons/preview/caribbean-blue/star-xxl.png'}}
      />
</TouchableOpacity>

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

        <ListView
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
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
    width:20,
    height:20,
  },
});

module.exports = KaraokeList;
