import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

var wStar = require('../../image/whiteStar.png');
var star = require('../../image/star.png');
const stylesCSS = require('../stylesCSS.js');

export class SongDetail extends Component {
  constructor(props){
    super(props);
    this.state = {text: ""};

    console.log(this.props)
  }

  loadImage(id) {
    if (this.props.detailData.favorite) {
      return star;
    } else {
      return wStar;
    }
  }

  render() {
    return (
      <View style={stylesCSS.songDetail}>
        <Text style={stylesCSS.textId}>
          {this.props.detailData.id}
        </Text>
        <Text style={styles.welcome}>
          {this.props.detailData.title}
        </Text>
        <Text style={styles.instructions}>
          {this.props.detailData.lyric}
        </Text>
        <Text style={styles.intructions}>
         {this.props.detailData.source}
        </Text>
         <Image
              style={styles.starIcon}
              source={this.loadImage(this.props.detailData.favorite)}
            />
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

module.exports = SongDetail;
