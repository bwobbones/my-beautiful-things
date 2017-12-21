import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import * as ImagePicker from 'react-native-image-picker';

import realm from '../realm';

let options = {
  title: 'Take/Select a Photo',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'beautiful',
    cameraRoll: true
  }
}

export default class ThingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'This Beautiful Thing'
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      thing: this.props.navigation.state.params.thing
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          photoSource: source
        });
      }
    });
  }

  // this now needs to be attached to the back button
  saveThing() {
    this.props.navigation.navigate('main');
  }

  updateText(thing, field, value) {
    realm.write(() => {
      thing[field] = value;
      realm.create('Thing', thing, true);
      this.setState({thing: thing})
    });
  }

  render() {
    let tmpThing = this.state.thing;
    return (
      <View>
        <Card image={this.state.photoSource}/>
        <Card>
          <FormLabel>What is it?</FormLabel>
          <FormInput
            value={tmpThing.whatIsIt} 
            onChangeText={(text) => {
              this.updateText(tmpThing, 'whatIsIt', text);
            }}/>

          <FormLabel>When I finished it</FormLabel>
          <FormInput 
            value={tmpThing.whenIFinishedIt}
            onChangeText={(text) => {
              this.updateText(tmpThing, 'whenIFinishedIt', text);
            }}/>

          <FormLabel>Who I made it for</FormLabel>
          <FormInput 
            value={tmpThing.whoIMadeItFor}
            onChangeText={(text) => {
              this.updateText(tmpThing, 'whoIMadeItFor', text);
            }}/>

          <FormLabel>Its story</FormLabel>
          <FormInput 
            value={tmpThing.itsStory}
            onChangeText={(text) => {
              this.updateText(tmpThing, 'itsStory', text);
            }}/>
        </Card>

        <Button
          raised
          icon={{name: 'save'}}
          title='Save'
          onPress={() => { 
            this.saveThing();
        }} />
      </View>
    );
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