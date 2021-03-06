
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, StatusBar, Button } from 'react-native';
import Expo, { Constants, Location, Permissions } from 'expo';
import MapView from 'react-native-maps';
import { createStackNavigator } from 'react-navigation'; // Version can be specified in package.json
//import { fadeIn, zoomIn } from 'react-navigation-transitions';


import AddPin from './src/components/add_pin_button/addPin.component';
import FilterPage from './src/components/search_filters/filters.component';
import CheckX from './src/components/check_and_x_button/check_and_x.component';
import MapScreen from './src/components/map/map.component';
import AddPinMap from './src/components/addpinmap/addpinmap.component';

import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from '@aws-amplify/core'
import config from './aws-exports'
Amplify.configure(config)

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      location: null,
      errorMessage: null,
    }
  }

  async componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      console.log('Permission to access location was granted!');
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    return (
      <CheckX/>
    );
  }
}

// export default withAuthenticator(App, { includeGreetings: true })
//export default App;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',}});

const RootStack = createStackNavigator( //render rootstack was deleted for my part
  {
    // Login: LoginScreen,
    MainMap: MapScreen,
    AddPin: AddPinMap
  },
  {
    initialRouteName: 'MainMap',
   // transitionConfig: () => fadeIn(),
  }
);

export default withAuthenticator(App)

