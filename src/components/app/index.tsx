/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";

const App = () => {
	return (
		<div className='app'>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
};

export default App;
