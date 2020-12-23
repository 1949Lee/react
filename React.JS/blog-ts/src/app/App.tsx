import React, {Suspense} from 'react';
import {Provider} from "react-redux";
import {BrowserRouter, match, Prompt, Route} from "react-router-dom";
import H from "history";
import Header from "../layout/header/header";
import Home from "../pages/home/home";
import {Routes} from "../router";
import SwitchWithLocationChange, {AdminRoute} from "../router/router-guard";
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


	handleRouterChange = (location: H.Location, history: H.History<H.History.LocationState>) => {
		if (
			Routes.newArticle.regexp.test(location.pathname) ||
			Routes.updateArticle.regexp.test(location.pathname)) {
			this.setState({isWriteArticle: true});
		} else {
			this.setState({isWriteArticle: false});
		}
	};

	render() {
		return (
			<Provider store={store}>
				<Suspense fallback={<div></div>}>
					<div>
						<BrowserRouter>
							<Header floatTop={this.state.isWriteArticle}/>
							<SwitchWithLocationChange onChange={this.handleRouterChange}>
								<Route exact path={Routes.home.path} component={Home}/>
								<Route exact path={Routes.category.path} component={Routes.category.component}/>
								<Route exact path={Routes.article.path} component={Routes.article.component}/>
								<Route exact path={Routes.about.path} component={Routes.about.component}/>
								<Route exact path={Routes.newArticle.path} component={Routes.newArticle.component}/>
								<Route exact path={Routes.updateArticle.path} component={Routes.updateArticle.component}/>
								<Route path={Routes.other.path}>
									404
								</Route>
							</SwitchWithLocationChange>
						</BrowserRouter>
					</div>
				</Suspense>
			</Provider>
		);
	}
}

export default App;
