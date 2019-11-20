import React from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import logo from '../logo.svg';
import H from "history";
import About from "../pages/about/about";
import Home from "../pages/home/home";
// import Home from "../pages/home/home";
import SwitchWithLocationChange from "../router/router-guard";
import store from "../store";
import * as style from './App.scss';

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


	handleRouterChange = (history: H.History<H.History.LocationState>) => {
		if (history.location.pathname === "/new-article") {
			this.setState({isWriteArticle:true});
			console.log(true);
		} else {
			this.setState({isWriteArticle:false});
		}
	};

	render() {
		return (
			<Provider store={store}>
				<div className={style['app']}>
					<BrowserRouter>
						{/*<Header floatTop={this.state.isWriteArticle}/>*/}
						<SwitchWithLocationChange onChange={this.handleRouterChange}>
							<Route exact path="/" component={Home}/>
							{/*<Route exact path="/article" component={Article} />*/}
							<Route exact path="/about" component={About}/>
							{/*<Route exact path="/new-article" component={NewArticle} />*/}
							<Route path="*">
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
