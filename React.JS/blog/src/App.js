import React from 'react';
import Header from './common/header';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/home";
import Article from "./pages/article";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
        <div style={headerBg}></div>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route exact path="/article" component={Article} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

const headerBg = {
  height:'56px'
};

export default App;
