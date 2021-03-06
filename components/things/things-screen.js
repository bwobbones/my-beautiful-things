import React, { Component } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Card, Divider, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'

var moment = require('moment');
import * as ImagePicker from 'react-native-image-picker';
import NavigationBar from 'react-native-navbar';

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

const titleConfig = {
  title: 'This Beautiful Things',
};

export default class ThingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
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
        let source = { uri: 'data:image/jpeg;base64,' + response.data }
    
        this.setState({
          photoSource: {
            uri: response.data
          }
        });

        this.updateText(thing, 'photos', [response.data]);
      }
    });
  }

  // this now needs to be attached to the back button
  saveThing() {
    if (this.thingIsValid()) {
      this.props.navigation.navigate('main');
    }
  }

  deleteThing() {
    realm.write(() => {
      realm.delete(this.state.thing);
      this.props.navigation.navigate('main');
    });
  }

  thingIsValid() {
    let tmpThing = this.state.thing;
    return tmpThing.whatIsIt !== '' &&
      (tmpThing.whenIFinishedIt !== '' || moment(tmpThing.whenIFinishedIt, 'DD/MM/YYYY', true).isValid())
      tmpThing.whoIMadeItFor !== '';
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
      <ScrollView style={styles.container}>

        <NavigationBar 
          style={{ margin:10 }}
          tintColor='#737eb6'
          title={titleConfig}
          leftButton={{
            title: 'Save',
            handler: () => this.saveThing(),
            tintColor: 'white'
          }}
        />

        {renderIf(this.state.photoSource.uri, 
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('gallery', { thing: tmpThing }) }}>
            <Image
              style={{width: '100%', height: 200}}
              imageProps={{resizeMode: 'cover'}}
              source={{ uri: 'data:image/jpeg;base64,' + this.state.photoSource.uri }}
            />
          </TouchableOpacity>
        )}
       
        <Card>
          <FormLabel>What is it?</FormLabel>
          <FormInput
            inputStyle={{width: '100%'}}
            value={tmpThing.whatIsIt} 
            onChangeText={(text) => {
              this.updateText(tmpThing, 'whatIsIt', text);
            }}/>
          {renderIf(tmpThing.whatIsIt === '', 
            <FormValidationMessage>
              {'This field is required'}
            </FormValidationMessage>
          )}

          <FormLabel>When I finished it</FormLabel>
          <FormInput 
            value={tmpThing.whenIFinishedIt}
            onChangeText={(text) => {
              this.updateText(tmpThing, 'whenIFinishedIt', text);
            }}/>
          {renderIf((tmpThing.whenIFinishedIt === '' || !moment(tmpThing.whenIFinishedIt, 'DD/MM/YYYY', true).isValid()), 
            <FormValidationMessage>
              {'Date needs to be in the format dd/mm/yyyy'}
            </FormValidationMessage>
          )}

          <FormLabel>Who I made it for</FormLabel>
          <FormInput 
            value={tmpThing.whoIMadeItFor}
            inputStyle={{width: '100%'}}
            onChangeText={(text) => {
              this.updateText(tmpThing, 'whoIMadeItFor', text);
            }}/>
          {renderIf(tmpThing.whoIMadeItFor === '', 
            <FormValidationMessage>
              {'This field is required'}
            </FormValidationMessage>
          )}

          <FormLabel>Its story</FormLabel>
          <FormInput 
            multiline
            inputStyle={{width: '100%'}}
            value={tmpThing.itsStory}
            onChangeText={(text) => {
              this.updateText(tmpThing, 'itsStory', text);
            }}/>
        </Card>

        <Card containerStyle={styles.buttonCard}>
          <Button
              buttonStyle={styles.button}
              icon={{name: 'playlist-add'}}
              title='Add a Photo'
              onPress={() => { 
                this.selectImage(tmpThing);
              }} />

          <Divider style={{ height: 10 }} />

          <Button
              buttonStyle={styles.button}
              icon={{name: 'delete'}}
              title='Delete'
              onPress={() => { 
                Alert.alert(
                  'You sure you want to delete?',
                  'Your beautiful thing will be gone forever',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => this.deleteThing()},
                  ],
                  { cancelable: true }
                )
              }} />

          <Divider style={{ height: 10 }} />

          <Button
            buttonStyle={styles.button}
            icon={{name: 'save'}}
            title='Save'
            onPress={() => { 
              this.saveThing();
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
    marginBottom: 10,
    backgroundColor: '#b2243c'
  }
});