/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import QuestionWriterUI from "../../../questions-box";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { useLocation, useParams } from "react-router-dom";
import DragUIContainer from "../../../drag-n-drop";

const Questions = () => {
	const location = useLocation();
	const [exam, setExam] = useState<Exam | undefined>();

	useEffect(() => {
		loadPartialExam(parseInt(location.state as string)).then(
			(loadedExam) => {
				loadedExam.downloadExistingQuestionsIfNecessary();
				setExam(loadedExam);
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
			</div> */}
			{/* {exam != undefined ? <DragUIContainer exam={exam} /> : ""} */}
		</Page>
	);
};

export default Questions;
