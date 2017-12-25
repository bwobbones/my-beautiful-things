import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import NavigationBar from 'react-native-navbar';
import Gallery from 'react-native-image-gallery';

export default class GalleryScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      thing: this.props.navigation.state.params.thing
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
        <NavigationBar 
            style={{ marginLeft:10, marginTop: 0 }}
            tintColor='black'
            leftButton={{
              title: 'Back',
              handler: () => navigate('things', { thing: this.state.thing }),
              tintColor: 'white'
            }}
          />
        <Gallery
          style={{ flex: 1, backgroundColor: 'black' }}
          images={[
            { source: { uri: 'data:image/jpeg;base64,' + this.state.thing.photos[0] } }
          ]}
        />
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