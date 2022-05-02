/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { Question } from "../../../../model/Question";
import { useLocation } from "react-router-dom";
import SubmitExamButton from "../../../submit-exam-button";
import ArrowButton from "../../../arrow-button";
import CircleButtonManager from "../../../circle-button-manager";
import { User } from "../../../../model/User";
import { useAuth } from "../../../../AuthContext";
import MultipleChoiceMultipleCorrect from "../../../select-all-question";
import Checkbox from "../../../check-box";


const Questions = () => {
	const location = useLocation();
	const [exam, setExam] = useState<Exam | undefined>();
	const [userIndex, setUserIndex] = useState(0);
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		loadPartialExam(parseInt(location.state as string)).then(
			(loadedExam) => {
				loadedExam
					.downloadExistingQuestionsIfNecessary()
					.then((actualExam) => setExam(actualExam));
			},
		);
	}, []);

	useEffect(() => {
		if (user != undefined) {
			user.questionIndex = userIndex;
		}
	}, [userIndex]);

	const circleButtonClicked = (question: Question, index: number) => {
		setUserIndex(index);
	};

	const loadUser = () => {
		const userAuth = useAuth().currentUser;
		if (userAuth != undefined) {
			userAuth.getIdToken().then((id) => {
				User.checkForUserForExam(
					parseInt(location.state as string),
					userIndex,
					id,
					userAuth.email ?? "",
				).then((user) => {
					console.log(user);
					setUser(user);
				});
			});
		}
	};

	const questionsClicked = (question: Question) => {
		console.log(question)
	}

	return (
		<Page>
			{user === undefined ? loadUser() : ""}
			<div className={styles.takeExam}>
				<div className={styles.titleBar}>
					<div className={styles.examName}> {exam?.name}</div>
					<SubmitExamButton onClick={() => alert("submit")} />
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
						{exam != undefined ? (
					<MultipleChoiceMultipleCorrect
						onClick={questionsClicked}
						question={exam?.questions[userIndex]}/>):""}
						{exam?.questions[userIndex].question}
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Questions;
