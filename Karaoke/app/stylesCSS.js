
const React = require('react-native')
const {StyleSheet, Platform,} = React

var styles = StyleSheet.create({
  listView: {
  	...Platform.select({
                          ios: {marginTop:160, },
                          android: {marginTop:30}}),
                        alignSelf:'stretch',
  },
  button: {
  	...Platform.select({
                            ios: {top:65, height:45,},
                            android: {top: 45, height:50,alignSelf: 'stretch',}}),
                          alignItems: 'flex-end',
                          backgroundColor:'#e5e5e5',
                          justifyContent: 'flex-end',
  },
  btnSearch: {
  	...Platform.select({
                            ios: {top:57, height:53,},
                            android: {top: 45, height:60,alignSelf: 'stretch',}}),
                          alignItems: 'flex-end',
                          backgroundColor:'#e5e5e5',
                          justifyContent: 'flex-end',
  },
  btnAdd: {
  	...Platform.select({
                          ios: {top:57, height:53,},
                          android: {top: 45, height:60,alignSelf: 'stretch',}}),
                          alignItems: 'flex-end',
                          backgroundColor:'#00ff00',
                          justifyContent: 'flex-end',
  },
  textInput: {
  	...Platform.select({
                            ios: {top:64},
                            android: {top: 54}}),
                          height: 46,
                          borderColor: '#e5e5e5',
                          borderWidth: 6,
                          textAlign: 'center',
  },
  textInputView: {
  	...Platform.select({
                          ios: {flex:1/2,},
                          android: {flex:1/2}
                       }),
  },
  searchView: {
  	...Platform.select({
                      ios: {flex:1, flexDirection: 'row'},
                      android: {flex:1 ,height:100,flexDirection: 'row'}
                      }),
  },
  searchViewFav:{
	...Platform.select({
                      ios: {flex:1, flexDirection: 'row'},
                      android: {flex:1 ,height:100,flexDirection: 'row'}
                      }),
  },
  textInputViewFav: {
  	...Platform.select({
                          ios: {flex:1/2, height:200 },
                          android: {flex:1/2}
                       }),
  },
  songDetail: {
  	...Platform.select({
                          ios: {flex:1, marginTop: 80,},
                          android: {flex:1, marginTop: 90}
                       }),
  						alignItems: 'center',
  },
  addSong: {
  	...Platform.select({
                          ios: {flex:1, marginTop: 30,},
                          android: {flex:1, marginTop: 40}
                       }),
  						alignItems: 'flex-start',
              alignSelf:'stretch',
              marginLeft: 30,
  },
  textId: {
			  	fontSize: 30,
			    fontWeight: 'bold',
			    textAlign: 'center',
			    color:'red',
  },

  contentAddSong: {
      ...Platform.select({
                          ios: {flex:1, paddingTop:60 },
                          android: {flex:1, paddingTop: 50,}
                       }),
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: '#F5FCFF',
  },

  addSongTitle: {
    ...Platform.select({
                          ios: { marginTop: 20,},
                          android: {marginTop: 20,}
                       }),
    color: 'blue',
  },

  addSongValue: {
    ...Platform.select({
                          ios: { flex: 0.1,},
                          android: {flex: 0.1,}
                       }),

    alignItems: 'flex-start',
    
    alignSelf:'stretch',
    
    borderColor: 'gray',
    borderWidth: 1,
  },

})

module.exports = styles;
