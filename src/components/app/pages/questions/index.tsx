/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { useLocation, useNavigate } from "react-router-dom";
import SubmitExamButton from "../../../submit-exam-button";
import ArrowButton from "../../../arrow-button";
import CircleButtonManager from "../../../circle-button-manager";
import ScoringModal from "../../../scoring-modal";

const Questions = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [exam, setExam] = useState<Exam | undefined>();
	const [showScoring, setScoring] = useState(false);

	useEffect(() => {
		loadPartialExam(parseInt(location.state as string)).then(
			(loadedExam) => {
				loadedExam.downloadExistingQuestionsIfNecessary();
				setExam(loadedExam);
			},
		);
	}, []);

	const onExit = () => {
		closeScoring();
		navigate("/exams");
	};

	const showScoringModal = () => setScoring(true);
	const closeScoring = () => setScoring(false);

	return (
		<Page>
			<div className={styles.takeExam}>
				<div className={styles.titleBar}>
					<div className={styles.examName}> {exam?.name}</div>
					<SubmitExamButton onClick={showScoringModal} />
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
					{/* <CircleButtonManager
						onClick={() => alert("circle")}
						exam={exam}
					/> */}
				</div>
				<div className={styles.questionRow}>
					<QuestionToolBar />
					<div className={styles.questionsBox}>
						{/*insert questions here */}
					</div>
				</div>
				<ScoringModal hide={showScoring} close={onExit} exam={exam!} />
			</div>
		</Page>
	);
};

export default Questions;
