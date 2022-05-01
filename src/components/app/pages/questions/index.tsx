/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { useLocation, useParams } from "react-router-dom";
import SubmitExamButton from "../../../submit-exam-button";
import ArrowButton from "../../../arrow-button";
import CircleButtonManager from "../../../circle-button-manager";

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
			<div className={styles.takeExam}>
				<div className={styles.titleBar}>
					<div className={styles.examName}> {exam?.name}</div>
					<SubmitExamButton onClick={() => alert("submit")} />
				</div>
				<div className={styles.circleArrowButtons}>
					<div>{/*map circle buttons for previous questions*/}</div>
					<ArrowButton
						onClick={() => alert("previous")}
						rotate={true}
						text='Previous'
					/>
					<div>{/*current question number*/}</div>
					<ArrowButton
						onClick={() => alert("next")}
						rotate={false}
						text='Next'
					/>
					<div>
						{/*map circle buttons for future questions*/}
						<CircleButtonManager
							onClick={() => alert("circle")}
							exam={exam}
						/>
					</div>
				</div>
				<div className={styles.questionRow}>
					<div className={styles.questionsToolBar}>
						<QuestionToolBar />
					</div>
					<div className={styles.questionsBox}>
						{/*insert questions here */}
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Questions;
