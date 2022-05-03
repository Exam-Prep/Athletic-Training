/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { Question } from "../../../../model/Question";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowButton from "../../../arrow-button";
import CircleButtonManager from "../../../circle-button-manager";
import ScoringModal from "../../../scoring-modal";

const Questions = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [exam, setExam] = useState<Exam | undefined>();
	const [userIndex, setUserIndex] = useState(0);
	const [showScoring, setScoring] = useState(false);

	useEffect(() => {
		loadPartialExam(parseInt(location.state as string)).then(
			(loadedExam) => {
				loadedExam
					.downloadExistingQuestionsIfNecessary()
					.then((actualExam) => setExam(actualExam));
			},
		);
	}, []);

	const circleButtonClicked = (question: Question, index: number) => {
		setUserIndex(index);
	};

	const onExit = () => {
		closeScoring();
	};

	const showScoringModal = () => setScoring(true);
	const closeScoring = () => setScoring(false);

	return (
		<Page>
				<div className={styles.titleBar}>
					<div className={styles.examName}> {exam?.name}</div>
					<SubmitExamButton onClick={showScoringModal} />
				</div>
				<div className={styles.circleArrowButtons}>
					<div>{/*map circle buttons for previous questions*/}</div>
					<ArrowButton
						onClick={() =>
							setUserIndex((currentIndex) => {
								if (currentIndex > 0) {
									currentIndex -= 1;
								}
								return currentIndex;
							})
						}
						rotate={true}
						text='Previous'
					/>
					<div>{/*current question number*/}</div>
					<ArrowButton
						onClick={() =>
							setUserIndex((currentIndex) => {
								currentIndex += 1;
								return currentIndex % exam!.questions.length;
							})
						}
						rotate={false}
						text='Next'
					/>
					<CircleButtonManager
						onClick={circleButtonClicked}
						exam={exam}
						currentIndex={userIndex}
					/>
				</div>
				<div className={styles.questionRow}>
					<QuestionToolBar />
					<div className={styles.questionsBox}>
						{exam?.questions[userIndex].question}
					</div>
				</div>
				<ScoringModal hide={showScoring} close={onExit} exam={exam!} />
			</div>
		</Page>
	);
};

export default Questions;
