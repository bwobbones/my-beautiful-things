import React, { Component } from 'react';
import { AppRegistry, Platform, StatusBar, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreen from './components/main/main-screen';
import ThingsScreen from './components/things/things-screen';

const AppNavigator = StackNavigator(
{
  main: {
    screen: MainScreen
  },
  things: {
    screen: ThingsScreen
  }
},{
cardStyle: {
  paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
}
});

export default AppNavigator;

// skip this line if using Create React Native App
AppRegistry.registerComponent('MyBeautifulThings', () => App);