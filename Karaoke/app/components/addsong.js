import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';

import { Form, InputField,
        Separator, SwitchField, LinkField ,
        PickerField, DatePickerField
      } from 'react-native-form-generator';


var wStar = require('../../image/whiteStar.png');
var star = require('../../image/star.png');
const stylesCSS = require('../stylesCSS.js');

export class AddSong extends Component {
  constructor(props){
    super(props);
    this.state = {text: ""};

    console.log(this.props)
  }

  render() {
    return (
      <View style={stylesCSS.addSong}>

        <Text style={styles.welcome}>
          Please enter all information
        </Text>

        <Form label="Add Song">
<InputField ref='id' label='Id:' placeholder='id'/>
<InputField ref='title' label='Title:' placeholder='title'/>
<InputField ref='title_simple' label='Title Simple:' placeholder='title simple' />
<PickerField ref='lang' label='Language:' placeholder='lang'
          options={{
            male: 'EN',
            female: 'VN'
          }}/>
<InputField ref='lyric' label='Lyric:' placeholder='lyric'/>
<InputField ref='source' label='Source:' placeholder='source'/>
              </Form>

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

module.exports = AddSong;
