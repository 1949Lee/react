/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';


type Props = {};
export default class HomePage extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hey, there!!</Text>
        <Button
          title="前往page1"
          onPress={() => this.props.navigation.navigate({routeName: 'page1', params: {user: 'Lee'}})}
        />
        <Button
          title="前往page3"
          onPress={() => this.props.navigation.navigate({routeName: 'page3', params: { mode: 'save'}})}
        />
        <Button
          title="前往FlatList Demo"
          onPress={() => this.props.navigation.navigate({routeName: 'flatList'})}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
