import React, { Component } from 'react';
import { Alert, AsyncStorage, Image, Picker, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, List, ListItem } from 'react-native-elements';

// not sure why i need to 'require' this or why it works
var moment = require('moment');
import * as uuid from 'uuid-js';
import SplashScreen from 'react-native-smart-splash-screen'
import NavigationBar from 'react-native-navbar';

import realm from '../realm';

const titleConfig = {
  title: 'My Beautiful Things',
};

export default class MainScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
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

  addThing() {
    let newThing = {
      uuid: uuid.create(4).toString(),
      whatIsIt: '',
      whenIFinishedIt:moment().format('DD/MM/YYYY'),
      whoIMadeItFor: ''
    };

    const { navigate } = this.props.navigation;
    navigate('things', { thing: newThing });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <NavigationBar 
          style={{ margin:10 }}
          tintColor='#737eb6'
          title={titleConfig}
          rightButton={{
            title: 'About',
            handler: () => { navigate('about') },
            tintColor: 'white'
          }}
        />
        <Card>
          <List containerStyle={styles.thingList}>
            {
              this.state.list.map((listItem, i) => (
                <ListItem
                  avatar={{ uri: 'data:image/jpeg;base64,' + listItem.photos[0]}}
                  key={i}
                  title={listItem.whatIsIt}
                  onPress={() => { navigate('things', { thing: listItem }); }}
                />
              ))
            }
          </List>
        </Card>
        <Card containerStyle={styles.buttonCard}>
          <Button
            buttonStyle={styles.button}
            icon={{name: 'playlist-add'}}
            title='Add More Beautiful'
            onPress={() => { 
              this.addThing();
            }} />
          </Card>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    backgroundColor: '#b2243c'
  },
  buttonCard: {
    padding: 0,
    backgroundColor: '#b2243c'
  },
  thingList: {
    marginTop: 0, 
    marginBottom: 0, 
    borderTopWidth: 1, 
    borderBottomWidth: 0, 
    borderBottomColor:'#cbd2d9'
  }
});