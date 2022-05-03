/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import QuestionToolBar from "../../../questions-toolbar";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { Question, QuestionType } from "../../../../model/Question";
import { useLocation, useNavigate } from "react-router-dom";
import SubmitExamButton from "../../../submit-exam-button";
import ArrowButton from "../../../arrow-button";
import CircleButtonManager from "../../../circle-button-manager";
import {
	AttemptedAnswer,
	answerMapsEqual,
	User,
	writeCurrentProgress,
} from "../../../../model/User";
import { useAuth } from "../../../../AuthContext";
import SelectAllUI from "../../../select-all-question";
import DisplayMatchQuestion from "../../../display-match-question";
import MatchQuestion from "../../../../model/MatchQuestion";
import MultipleChoiceUI from "../../../multiple-choice-ui";
import ScoringModal from "../../../scoring-modal";

const Questions = () => {
	const navigate = useNavigate();
	const [exam, setExam] = useState<Exam | undefined>();
	const [userIndex, setUserIndex] = useState(0);
	const [user, setUser] = useState<User | undefined>();
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

	useEffect(() => {
		if (user != undefined) {
			user.questionIndex = userIndex;
		}

		return () => {
			if (user != undefined) {
				writeCurrentProgress(user);
			}
		};
	}, [userIndex]);

	const circleButtonClicked = (question: Question, index: number) => {
		setUserIndex(index);
	};

	const onExit = () => {
		closeScoring();
		navigate("/exams");
	};

	const showScoringModal = () => setScoring(true);
	const closeScoring = () => setScoring(false);

	const loadUser = () => {
		const userAuth = useAuth().currentUser;
		if (userAuth != undefined) {
			User.checkForUserForExam(
				parseInt(location.state as string),
				userIndex,
				userAuth.uid,
				userAuth.email ?? "",
			).then((user) => {
				setUser(user);
				setUserIndex(user.questionIndex);
			});
		}
	};

	const multipleChoiceQuestionClicked = (
		question: Question,
		index: number,
	) => {
		const answer = question.answers[index];
		const attemptedAnswer = new AttemptedAnswer(
			question.id,
			answer.isCorrect,
			[answer.answerID],
			undefined,
		);
		user?.addOrUpdateAnswer(attemptedAnswer);
	};

	const multipleChoiceMultipleCorrectQuestionClicked = (
		question: Question,
		index: Array<number | undefined>,
	) => {
		const answers = index.flatMap((x) => {
			return x === undefined ? [] : [question.answers[x]];
		});
		let isCorrect = true;
		answers.forEach((x) => {
			if (x.isCorrect === false) {
				isCorrect = false;
			}
		});
		const attemptedAnswer = new AttemptedAnswer(
			question.id,
			isCorrect,
			answers.map((x) => {
				return x.answerID;
			}),
			undefined,
		);
		user?.addOrUpdateAnswer(attemptedAnswer);
	};

	const matchQuestionAnswered = (
		answerMap: Map<string, string>,
		matchQuestion: MatchQuestion,
	) => {
		const attemptedAnswer = new AttemptedAnswer(
			matchQuestion.id,
			answerMapsEqual(answerMap, matchQuestion.answerMap),
			undefined,
			answerMap,
		);
		user?.addOrUpdateAnswer(attemptedAnswer);
	};

	const renderQuestion = (currentIndex: number) => {
		if (exam != undefined) {
			const question = exam.questions[currentIndex];
			const attemptedAnswer = user?.attemptedAnswerForID(question.id);
			if (question.type == QuestionType.MultipleChoice) {
				return (
					<MultipleChoiceUI
						onClick={multipleChoiceQuestionClicked}
						attemptedAnswer={attemptedAnswer}
						question={question}
					/>
				);
			} else if (
				question.type == QuestionType.MultipleChoiceMultipleCorrect
			) {
				return (
					<SelectAllUI
						onClick={multipleChoiceMultipleCorrectQuestionClicked}
						attemptedAnswer={attemptedAnswer}
						question={exam.questions[currentIndex]}
					/>
				);
			} else if (question.type == QuestionType.Match) {
				return (
					<DisplayMatchQuestion
						didAnswer={matchQuestionAnswered}
						attemptedAnswer={attemptedAnswer}
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
						{renderQuestion(userIndex)}
					</div>
				</div>
				<ScoringModal hide={showScoring} close={onExit} exam={exam!} />
			</div>
		</Page>
	);
};

export default Questions;
