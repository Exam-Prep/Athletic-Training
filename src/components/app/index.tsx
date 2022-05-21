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
						{/* Routes for the three pages in our project
							default / is login
							/questions is the exam taking page
							/exams is where available exams are listed
						*/}
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
