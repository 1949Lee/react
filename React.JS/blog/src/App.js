import React from 'react';
import About from "./pages/about/about.js";
import NewArticle from "./pages/write-article/new-article/new-article.js";
import Header from './common/header/header.js';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/home/home.js";
import Article from "./pages/article/article.js";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Header/>
          <div style={headerHeight}></div>
          <Route exact path="/" component={Home} />
          <Route exact path="/article" component={Article} />
          <Route exact path="/about" component={About} />
          <Route exact path="/new-article" component={NewArticle} />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

const headerHeight = {
  height:'56px'
};

export default App;
