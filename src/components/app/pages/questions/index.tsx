/** @format */
import React from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import QuestionWriterUI from "../../../questions-box";

const Questions = () => {
	return (
		<Page>
			<div className={styles.questionsBox}>
				<QuestionWriterUI />
			</div>
			<div className={styles.questionsToolBar}></div>
			<div className={styles.titleBar}></div>
			<div className={styles.questionsToolBar}>
				<QuestionToolBar />
			</div>
		</Page>
	);
};

export default Questions;
