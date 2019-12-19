import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, match, Route} from "react-router-dom";
import H from "history";
import Header from "../layout/header/header";
import About from "../pages/about/about";
import Home from "../pages/home/home";
import NewArticle from "../pages/write-article/new-article/new-article";
import {Routes} from "../router";
import SwitchWithLocationChange from "../router/router-guard";
import store from "../store";
// import * as style from './App.scss';

interface AppState {

	// 是否处于编辑模式
	isWriteArticle: boolean
}

class App extends React.Component<React.ComponentProps<any>, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			isWriteArticle: false
		};
	}


	handleRouterChange = (location:H.Location,history: H.History<H.History.LocationState>) => {
		if (Routes.newArticle.regexp.test(history.location.pathname)) {
			this.setState({isWriteArticle:true});
		} else {
			this.setState({isWriteArticle:false});
		}
	};

	render() {
		return (
			<Provider store={store}>
				<div>
					<BrowserRouter>
						<Header floatTop={this.state.isWriteArticle} />
						<SwitchWithLocationChange onChange={this.handleRouterChange}>
							<Route exact path={Routes.home.path} component={Home}/>
							{/*<Route exact path="/article" component={Article} />*/}
							<Route exact path={Routes.about.path} component={About}/>
							<Route exact path={Routes.newArticle.path} component={NewArticle} />
							<Route path={Routes.other.path}>
								404
							</Route>
						</SwitchWithLocationChange>
					</BrowserRouter>
				</div>
			</Provider>
		);
	}
}

export default App;
