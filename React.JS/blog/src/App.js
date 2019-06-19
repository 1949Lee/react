import React from 'react';
import Header from './common/header';
import {Provider} from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header/>
      </div>
    </Provider>
  );
}

export default App;
