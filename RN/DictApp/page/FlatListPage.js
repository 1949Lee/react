/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

type Props = {};

const CITY_NAMES = [
  {code: 1, name: "北京"},
  {code: 2, name: "上海"},
  {code: 3, name: "成都"},
  {code: 4, name: "重庆"},
  {code: 5, name: "杭州"},
  {code: 6, name: "南京"},
  {code: 7, name: "广州"},
  {code: 8, name: "澳门"},
  {code: 9, name: "香港"},
  {code: 10, name: "石家庄"},
  {code: 11, name: "郑州"},
  {code: 12, name: "武汉"},
  {code: 13, name: "厦门"},
  {code: 14, name: "哈尔滨"},
  {code: 15, name: "青岛"},
  {code: 16, name: "拉萨"},
  {code: 17, name: "西安"}
];
export default class FlatListPage extends Component<Props> {

  constructor(Props) {
    super(Props);
    this.state = {
      cityList: CITY_NAMES
    }
  }

  componentDidMount(): void {
    this.setState({cityList: CITY_NAMES});
  }

  // 绘制列表
  _renderFlatListItem(data) {
    let {name,code} = data.item;
    return <View style={styles.item}>
      <Text style={styles.itemText}>
        {name}
      </Text>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.cityList}
          renderItem={data =>
            this._renderFlatListItem(data)
          }
          keyExtractor={(item, index) => {
            return item.code.toString()
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    color: 'black',
    backgroundColor: 'aqua',
    marginBottom:20
  },
  itemText:{
    fontSize:20
  }
});
