/** @format */

import React from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";

const Questions = () => {
	return (
		<Page>
			<div className={styles.questionsBox}></div>
			<div className={styles.questionsToolBar}></div>
			<div className={styles.titleBar}></div>
			<div className={styles.questionsToolBar}>
				<QuestionToolBar />
			</div>
		</Page>
	);
};

export default Questions;
