/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import QuestionWriterUI from "../../../questions-box";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { useLocation, useParams } from "react-router-dom";

const Questions = () => {
	const location = useLocation();
	const [exam, setExam] = useState<Exam | undefined>();

	useEffect(() => {
		loadPartialExam(parseInt(location.state as string)).then(
			(loadedExam) => {
				loadedExam
					.downloadExistingQuestionsIfNecessary()
					.then((actualExam) => {
						setExam(actualExam);
					});
			},
		);
	}, []);

	return (
		<Page>
			{/* <div className={styles.questionsBox}>
				<QuestionWriterUI />
			</div>
			<div className={styles.questionsToolBar}></div> */}
			<div className={styles.titleBar}>{exam?.name}</div>
			{/* <div className={styles.questionsToolBar}>
				<QuestionToolBar />
			</div>

			<div className={styles.questionsToolBar}> </div> */}
		</Page>
	);
};

export default Questions;
