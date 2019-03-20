/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {};
export default class Page3 extends Component<Props> {

  constructor(){
    super();
    // this.state = {
    //
    // }
  }

  // state = {};
  // componentDidMount(): void {
  //
  // }

  toggleTitleInput(){
    const {navigation} = this.props;
    if(navigation.state.params.mode === 'edit') {
      return <TextInput style={styles['text-input']} onChangeText={(text)=>{
        navigation.setParams({title:text})
      }}/>
    } else {
      return null;
    }
  }

  render() {
    const titleInput = this.toggleTitleInput();
    return (
      <View style={styles.container}>
        {titleInput}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  'text-input': {
    height:20,
    width:200,
    alignSelf:'center',
    borderWidth:1,
    marginTop:10,
    borderColor:'black'
  }
});
