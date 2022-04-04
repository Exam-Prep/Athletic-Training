/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Questions from "./pages/questions";
import { AuthContextProvider } from "../../AuthContext";
import styles from "./base.scss";

const App = () => {
	return (
		<div className={styles.app}>
			<AuthContextProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Login />} />
						<Route path='/questions' element={<Questions />} />
					</Routes>
				</Router>
			</AuthContextProvider>
		</div>
	);
};

export default App;
