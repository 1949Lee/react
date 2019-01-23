* React Fiber说的是React 16 之后，React团队将React的底层进行了重构，提升了渲染速度：https://blog.csdn.net/qiqingjin/article/details/80118669
* React 组件声明的写法：
  ```
  import React, { Component } from 'react';

  class App extends Component {
  }

  import React, { Component } from 'react';

  class App extends React.Component {
  }

  ```
* React 组件传值：简单来说，
  ``` JSX
  <!-- 父组件中调用子组件 -->
  <Child name={this.state.name} custom={this.state.a} />

   <!-- 子组件中 -->
  <div>{{this.props.name}}</div>
  <div>{{this.props.custom}}</div>
  ```
  父组件可以将方法传给子组件，然后子组件去掉用！！！！！！
* Fragment可以用来包裹组件模板（相当于Angular中的ng-container）。