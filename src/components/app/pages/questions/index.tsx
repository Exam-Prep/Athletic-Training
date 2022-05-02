/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import QuestionWriterUI from "../../../questions-box";
import MultipleChoiceMultipleCorrect from "../../../select-all-question";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { useLocation, useParams } from "react-router-dom";
import Checkbox from "../../../check-box";
import { Question } from "../../../../model/Question";


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


	const questionsClicked = (question: Question) => {
		console.log(question)
	}
	return (
		<Page>
			<div className={styles.questionsBox}>
				<div className={styles.MultipleChoiceMultipleCorrect}></div>
				{exam != undefined ? (
					<MultipleChoiceMultipleCorrect
						onClick={questionsClicked}
						question={exam?.questions[0]}/>):("")}
				<QuestionWriterUI />
			</div>
			<div className={styles.questionsToolBar}></div>
			<div className={styles.titleBar}>{exam?.name}</div>
			
			<div className={styles.questionsToolBar}>
				<QuestionToolBar />
			</div>
		</Page>
	);
};

export default Questions;
