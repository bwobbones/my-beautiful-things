import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-elements';

// not sure why i need to 'require' this or why it works
var moment = require('moment');
import * as uuid from 'uuid-js';
import SplashScreen from 'react-native-smart-splash-screen'
import NavigationBar from 'react-native-navbar';

import realm from '../realm';

const titleConfig = {
  title: 'About',
};

export default class AboutScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
          <NavigationBar 
            style={{ margin:10 }}
            tintColor='#737eb6'
            title={titleConfig}
            leftButton={{
              title: 'Back',
              handler: () => { navigate('main'); },
              tintColor: 'white'
            }}
        />
        <Card>
          <Text h4>My Beautiful Things</Text>
          <Divider style={styles.divider} />
          <Text>
            For as long as I've known her, Lexi has made the most beautiful things.  She takes a photo of them which 
            is stored in our photo collection somewhere and then she gives the beautiful thing away to someone she
            loves.  She is the most generous person I know, some of these beautiful things take months to make.
          </Text>
          <Divider style={styles.divider} />
          <Text>
            Rather that show off her beautiful things on Facebook or Pinterest, Lexi holds her them near
            to her heart and shares them only with those lucky enough to receive them.  To share them with anyone
            else would in a small way de-value them and reduce their specialness.
          </Text>
          <Divider style={styles.divider} />
          <Text>
            This app is to help keep a little bit of each beautiful thing in a special place just for her.  It's my way
            of making my own beautiful thing for my most beautiful thing in the world.  Our son Jack custom made all the 
            artwork and worked out the colours.  Our children all immediately saw the value in finding a place for Mum to keep
            the beautiful things she'd made just for them.
          </Text>
          <Divider style={styles.divider} />
          <Text>
            You can take a photo, write a story and most of all remember each of the wonderful things that you make without
            worrying about it getting to the internet, everything is stored on your phone just for you. 
          </Text>
          <Divider style={styles.divider} />
          <Text>
            This project is hosted at https://github.com/bwobbones/my-beautiful-things where you can raise issues, submit PRs.
            Feel free to pass it on to a beautiful thing in your life.
          </Text>
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
  divider: {
    height: 10,
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  }
});