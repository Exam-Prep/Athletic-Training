/** @format */

import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Questions from "./pages/questions";
import ExamList from "./pages/exam-list";
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
						<Route path='/exams' element={<ExamList />} />
					</Routes>
				</Router>
			</AuthContextProvider>
		</div>
	);
};

export default App;
