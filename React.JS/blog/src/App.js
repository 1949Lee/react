import React, {Component} from 'react';
import About from "./pages/about/about.js";
import NewArticle from "./pages/write-article/new-article/new-article.js";
import Header from './common/header/header.js';
import {Provider} from "react-redux";
import store from "./store";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/home/home.js";
import Article from "./pages/article/article.js";
import SwitchWithLocationChange from './router/router-guard.js'

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			isWriteArticle:false
		};
		this.handleRouterChange = this.handleRouterChange.bind(this);
	}

	handleRouterChange(history) {
		if (history.location.pathname === "/new-article") {
			console.log(1);
			this.setState({isWriteArticle:true})
		} else {
			console.log(2);
			this.setState({isWriteArticle:false})
		}
	}

  render() {
		return (
			<Provider store={store}>
				<div className="App">
					<BrowserRouter>
						<Header floatTop={this.state.isWriteArticle}/>
						{
							!this.state.isWriteArticle?<div style={headerHeight}></div>:null

						}
						<SwitchWithLocationChange onChange={this.handleRouterChange}>
							<Route exact path="/" component={Home} />
							<Route exact path="/article" component={Article} />
							<Route exact path="/about" component={About} />
							<Route exact path="/new-article" component={NewArticle} />
						</SwitchWithLocationChange>
					</BrowserRouter>
				</div>
			</Provider>
		)
	}
}

const headerHeight = {
  height:'56px'
};

export default App;
