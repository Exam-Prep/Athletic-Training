/** @format */

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Login from "./pages/login";

const customHistory = createBrowserHistory();

const App = () => {
	return (
		<div className='app'>
			<Router history={customHistory}>
				<Switch>
					<Route path={"/"}>
						<Login />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default App;
