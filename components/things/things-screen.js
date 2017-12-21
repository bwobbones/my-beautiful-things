import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card, Divider, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

import * as ImagePicker from 'react-native-image-picker';

import realm from '../realm';
import renderIf from '../utils/renderIf';

let options = {
  title: 'Take/Select a Photo',
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

    // This will eventually be used as a gallery, so its a list that we only use the first element
    // of for now
    let photoUri = undefined;
    if (this.props.navigation.state.params.thing && this.props.navigation.state.params.thing.photos) {
      photoUri = this.props.navigation.state.params.thing.photos[0];
    }

    this.state = {
      thing: this.props.navigation.state.params.thing,
      photoSource: {
        uri: photoUri
      }
    };

  }

  selectImage(thing) {
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
        let source = { uri: response.uri }
    
        this.setState({
          photoSource: source
        });

        this.updateText(thing, 'photos', [source.uri]);
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
      <View style={{flex: 1, flexDirection: 'column'}}>
        {renderIf(this.state.photoSource.uri, 
          <Card 
            image={{uri: this.state.photoSource.uri}}
            imageProps={{resizeMode: 'stretch'}}
            style={styles.canvas}
          /> 
        )}
       
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
        <Card>

          <Button
              raised
              icon={{name: 'playlist-add'}}
              title='Add a Photo'
              onPress={() => { 
                this.selectImage(tmpThing);
              }} />

          <Button
            raised
            icon={{name: 'save'}}
            title='Save'
            onPress={() => { 
              this.saveThing();
          }} />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 20,
    color: 'white'
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});