import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, Picker, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, List, ListItem } from 'react-native-elements';

import * as uuid from 'react-native-uuid';
import SplashScreen from 'react-native-smart-splash-screen'

import realm from '../realm';

export default class MainScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'My Beautiful Things'
    };
  };

  constructor(props) {
    super(props);
    
    this.state = {
      list: []
    };
  }

  componentWillMount() {
    const things = realm.objects('Thing');
    this.setState({ list: things });
  }

  componentDidMount () {
    SplashScreen.close({
       animationType: SplashScreen.animationType.scale,
       duration: 850,
       delay: 500,
    })
  }

  render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Card>
            <List>
              {
                this.state.list.map((listItem, i) => (
                  <ListItem
                    roundAvatar
                    // avatar={{uri:listItem.avatar_url}}
                    key={i}
                    title={listItem.whatIsIt}
                    onPress={() => { navigate('things', { thing: listItem }); }}
                  />
                ))
              }
            </List>
          </Card>
          <Card>
            <Button
              raised
              icon={{name: 'playlist-add'}}
              title='Add More Beautiful'
              onPress={() => { 
                this.addThing();
              }} />
          </Card>
        </View>
    );
  }

  addThing() {
    let newThing = {
      uuid: uuid.v4(),
      whatIsIt: 'quilt',
      whenIFinishedIt: '23/12/2017',
      whoIMadeItFor: 'Jack',
      itsStory: 'I made it because I love him'
    };

    realm.write(() => {
      realm.create('Thing', newThing);
    });

    const things = realm.objects('Thing');
    this.setState({ list: things });
  }

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });