/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { Question, QuestionType } from "../../../../model/Question";
import { useLocation } from "react-router-dom";
import SubmitExamButton from "../../../submit-exam-button";
import ArrowButton from "../../../arrow-button";
import CircleButtonManager from "../../../circle-button-manager";
import { User } from "../../../../model/User";
import { useAuth } from "../../../../AuthContext";
import SelectAllUI from "../../../select-all-question";
import DisplayMatchQuestion from "../../../display-match-question";
import MatchQuestion from "../../../../model/MatchQuestion";
import MultipleChoiceUI from "../../../multiple-choice-ui";

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

	const multipleChoiceQuestionClicked = (
		question: Question,
		index: number,
	) => {
		console.log("MultipleChoice", question, index);
	};

	const multipleChoiceMultipleCorrectQuestionClicked = (
		question: Question,
		index: number,
	) => {
		console.log("MULTIPLECHOICEMULTIPLECORRECT", question, index);
	};

	const matchQuestionAnswered = (
		answerMap: Map<string, string>,
		matchQuestion: MatchQuestion,
	) => {
		console.log(answerMap, matchQuestion);
	};

	const renderQuestion = (currentIndex: number) => {
		if (exam != undefined) {
			const question = exam.questions[currentIndex];
			if (question.type == QuestionType.MultipleChoice) {
				return (
					<MultipleChoiceUI
						onClick={multipleChoiceQuestionClicked}
						question={question}
					/>
				);
			} else if (
				question.type == QuestionType.MultipleChoiceMultipleCorrect
			) {
				return (
					<SelectAllUI
						onClick={multipleChoiceMultipleCorrectQuestionClicked}
						question={exam.questions[currentIndex]}
					/>
				);
			} else if (question.type == QuestionType.Match) {
				return (
					<DisplayMatchQuestion
						didAnswer={matchQuestionAnswered}
						matchQuestion={question as MatchQuestion}
					/>
				);
			} else if (question.type == QuestionType.HotSpot) {
				return "hot spot " + question.question;
			}
		} else {
			return "";
		}
	};

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
						{exam?.questions[userIndex].question}
						{renderQuestion(userIndex)};
					</div>
				</div>
			</div>
		</Page>
	);
};

export default Questions;
