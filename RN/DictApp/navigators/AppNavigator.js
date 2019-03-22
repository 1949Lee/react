import React from "react";
import {Button} from "react-native";
import {createAppContainer, createStackNavigator,createBottomTabNavigator,createMaterialTopTabNavigator} from "react-navigation";
import HomePage from "~/page/HomePage.js";
import FlatList from "~/page/FlatList.js";
import Page3 from "~/page/Page3.js";

const routeConfigs = {}

const appNavigators = createStackNavigator({
  home: {
    screen: HomePage,
    path: 'home',
    navigationOptions: () => ({
      title: `测试Demo-主页`,
      headerBackTitle: '返回'
    })
  },
  page1: {
    screen: Page1,
    path: 'page1/:user',
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.user}'s Page1!`,
    }),
  },
  flatList: {
    screen: FlatList,
    path: 'flatList',
    navigationOptions: { // 在这里定义每个页面的导航属性，静态配置
      title: "This is Page2.",
    }
  },
  page3: {
    screen: Page3,
    path: 'page3',
    navigationOptions: (props) => {//在这里定义每个页面的导航属性，动态配置
      const {navigation} = props;
      const {state, setParams} = navigation;
      const {params} = state;
      return {
        title: params.title ? params.title : 'This is Page3',
        headerRight: (
          <Button
            title={params.mode === 'edit' ? '保存' : '编辑'}
            onPress={() =>
              setParams({mode: params.mode === 'edit' ? '' : 'edit'})}
          />
        ),
      }
    }
  },
  page4: {
    screen: FlatList,
    path: 'page4'
  },
  page5: {
    screen: Page5,
    path: 'page5'
  }
}, {
  initialRouteName: 'home'
});

const AppContainer = createAppContainer(appNavigators);


export {AppContainer} ;



