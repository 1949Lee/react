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
* JSX 语法中，组件必须大写：
```html
<App/>  
<!-- 而不能 <app /> -->
```

* React组件必须有一个根元素，但是定义普通的div可能会影响页面（css等）。所以需要一个不会渲染的元素(类似Angular的ng-container或者Vue的template)Fragment:
```jsx harmony
import  {Fragment} from 'react';
<Fragment>
    <div></div>
    <ul></ul>
</Fragment>

// 其中的Fragment不会渲染出html标签。
```

* React中的state的属性不可以直接改变必须调用setSate去改变。这样做的目的是在优化时有更好的处理，可以搭配Immutable.js优化：
1. [React之Immutable学习记录](https://www.cnblogs.com/chris-oil/p/8494337.html)
2. [使用immutable优化React](https://segmentfault.com/a/1190000010438089)

* React中集中组件的写法：[React中的组件有几种写法](https://segmentfault.com/a/1190000011434694)

* JSX中添加注释:
```jsx harmony
{/**这里是注释*/}
```

* React中在JSX的组件中添加样式类名时建议使用className='test'而不是class='test',因为React会认为class和JS类的关键字冲突了。

* React中在JSX的组件中label添加for的时候是建议使用htmlFor='test'而不是for='test',因为React会认为for和JS中循环的关键字冲突了。

* React中假设有这样的字符串`<h1>测试</h1>`，在jsx中显示时会显示为字符串，不会显示为html，因为默认防止xss攻击的。但是特殊情况下就是想要直接显示为html。可以这么做：
> 显示原本字符串：
> ```typescript jsx
> <span>{item}</span>
> ```

<br/><br/>

> 将字符串转换为html后显示
> ```typescript jsx
> <span dangerouslySetInnerHtml={{__html: item}}></span>
> ```

* 【优化】React中方法的bind(this)建议写到组件的构造函数中，不建议写在模板的事件(click)中。

* 新版React中setState不再建议直接传入对象的方式去更新state，为了提升性能，建议通过传入参数的方式来更新state，减少不必要的渲染：
```typescript jsx
handleClick(e){
    let value = e.target.value;
    this.setState( (prevState) => ({
        list:[...prevState.list,value],
        inputValue: ''
    }));
}
```

* React只会影响index.html中挂载的元素里面的内容（默认是div.root），其他标签的内容不受影响，你可以和Vue、Angular等其他框架一起使用。

* React中父组件传给子组件的值（props中的值），只读，不能写，readonly。

* React中定位只是视图层的框架，只负责数据到视图。多级组件的交互交给其他的技术负责（Redux）。

* React中父组件的render函数重新执行的时候，这个父组件引用的所有子组件的render的函数都将被重新执行

* 【优化】React中父组件的render函数被执行的时候，其已经渲染的子组件（从父组件接收参数的子组件）的componentWillReceiveProps生命周期函数就会被执行。所以需要利用子组件的shouldComponentUpdate生命周期函数来减少子组件无谓的视图更新。

* 【经验-坑】组件请求数据如果放在组件的componentWillMount中，可能会导致：React Native中出现问题、服务器端渲染时会出现问题。

* 【经验-坑】在React-Redux中，在reducer处理state时，需要制作一份state的副本（对state做深拷贝），然后进行操作。这是因为，在React-Redux中，每次reducer返回新的state会跟旧的state做===对比，如果false认为store改变，从而触发页面重绘，如果true，则认为不变，不会触发重绘。所以reducer返回新的state是为了通知redux让页面重绘。
* 【经验-坑】在React-Redux中，store在项目中应该是唯一的。reducer必须是纯函数：
    * 如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。
    * 该函数不会产生任何可观察的副作用，例如网络请求，输入和输出设备或数据突变（mutation）。所以reducer中不允许出现网络请求。
* 在React-Redux中，在组件中：
    * store.dispatch 发出action。
    * store.getState 返回store中state的内容。
    * store.subscribe 订阅store中state的改变。如果不订阅，即使store中的state发生改变，视图也不会更新。
* 当一个组件只有render函数的时候，可以变为一个无状态组件（纯函数，不继承react组件，所以没有生命周期那些影响）。
* 组件懒加载（异步组件）可以用异步加载框架来实现：react-loadable等。
                                                    


