/** @format */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { AuthContextProvider } from "../../AuthContext";
import styles from "./base.scss";

const App = () => {
	return (
		<div className={styles.app}>
			<AuthContextProvider>
				<Router>
					<Routes>
						<Route path='/' element={<Login />} />
					</Routes>
				</Router>
			</AuthContextProvider>
		</div>
	);
};

export default App;
