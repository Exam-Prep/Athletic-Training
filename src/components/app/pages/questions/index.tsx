/** @format */

import React from "react";

import Page from "../page";

import styles from "./styles.scss";

const Questions = () => {
	return (
		<Page>
			<div className={styles.questionsBox}></div>
			<div className={styles.questionsToolBar}></div>
			<div className={styles.titleBar}></div>
		</Page>
	);
};

export default Questions;
