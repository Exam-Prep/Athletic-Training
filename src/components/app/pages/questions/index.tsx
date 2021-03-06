/** @format */
import React, { useState, useEffect } from "react";
import Page from "../page";
import styles from "./styles.scss";
import { Exam, loadPartialExam } from "../../../../model/Exam";
import { Question, QuestionType } from "../../../../model/Question";
import { useLocation, useNavigate } from "react-router-dom";
import SubmitExamButton from "../../../submit-exam-button";
import ArrowButton from "../../../arrow-button";
import CircleButtonManager from "../../../circle-button-manager";
import { AttemptedAnswer, answerMapsEqual, User } from "../../../../model/User";
import { useAuth } from "../../../../AuthContext";
import SelectAllUI from "../../../select-all-question";
import DisplayMatchQuestion from "../../../display-match-question";
import MatchQuestion from "../../../../model/MatchQuestion";
import MultipleChoiceUI from "../../../multiple-choice-ui";
import ScoringModal from "../../../scoring-modal";
import DisplayHotSpot from "../../../display-hot-spot";
import HotSpotQuestion from "../../../../model/HotSpotQuestion";

const Questions = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [exam, setExam] = useState<Exam | undefined>();
	const [userIndex, setUserIndex] = useState(0);
	const [user, setUser] = useState<User | undefined>();
	const [showScoring, setScoring] = useState(false);
	// this feature will remain unimplimented at this time
	// const [showNotDone, setNotDone] = useState(false);

	// download questions for the exam we are in
	useEffect(() => {
		loadPartialExam(parseInt(location.state as string)).then(
			(loadedExam) => {
				loadedExam
					.downloadExistingQuestionsIfNecessary()
					.then((actualExam) => setExam(actualExam));
			},
		);
	}, []);

	// set the new question index for the user if they click on one of the numbered circles
	const circleButtonClicked = (question: Question, index: number) => {
		setUserIndex(index);
	};

	// close the scoring modal and exit the exam when a user submits it
	const onExit = () => {
		closeScoring();
		navigate("/exams");
	};

	// show the scoring modal
	const showScoringModal = () => {
		setScoring(true);
		// closeNotDone();
	};
	// close the scoring modal
	const closeScoring = () => setScoring(false);
	// const showNotDoneModal = () => setNotDone(true);
	// const closeNotDone = () => setNotDone(false);

	// load the user into the exam so that answers are set for the correct person
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
				if (user.questionIndex < exam?.questions.length) {
					setUserIndex(user.questionIndex);
				}
			});
		}
	};

	// if an answer is clicked on a multiple choice question
	const multipleChoiceQuestionClicked = (
		question: Question,
		index: number,
	) => {
		// record the answer the user clicked
		const answer = question.answers[index];
		const attemptedAnswer = new AttemptedAnswer(
			question.id,
			answer.isCorrect,
			[answer.answerText],
			undefined,
		);
		// check if we need to write this answer to the database
		user?.addOrUpdateAnswer(attemptedAnswer);
	};

	// when a select all that apply checkbox is clicked
	const multipleChoiceMultipleCorrectQuestionClicked = (
		question: Question,
		index: Array<number | undefined>,
	) => {
		// record the array of answers chosen
		const answers = index.flatMap((x) => {
			return x === undefined ? [] : [question.answers[x]];
		});
		let isCorrect = true;
		// if one of the selected answers is false, wrong
		answers.forEach((x) => {
			if (x.isCorrect === false) {
				isCorrect = false;
			}
		});
		// if not all correct answers were selected, wrong
		if (answers.length !== question.correctAnswers().length) {
			isCorrect = false;
		}
		// if no answer, wrong
		if (answers === undefined) {
			isCorrect = false;
		}
		const attemptedAnswer = new AttemptedAnswer(
			question.id,
			isCorrect,
			answers.map((x) => {
				return x.answerText;
			}),
			undefined,
		);
		// push data to the database if necessary
		user?.addOrUpdateAnswer(attemptedAnswer);
	};

	// when a match question is answered
	const matchQuestionAnswered = (
		answerMap: Map<string, string>,
		matchQuestion: MatchQuestion,
	) => {
		// record the answer map that was generated
		const attemptedAnswer = new AttemptedAnswer(
			matchQuestion.id,
			answerMapsEqual(answerMap, matchQuestion.answerMap),
			undefined,
			answerMap,
		);
		// push to the database if necessary
		user?.addOrUpdateAnswer(attemptedAnswer);
	};

	// when a hot spot question is clicked
	const hotSpotQuestionAnswered = (
		hotSpotQuestion: HotSpotQuestion,
		x: number,
		y: number,
	) => {
		// record the (x,y) clicked on the image
		const attemptedAnswer = new AttemptedAnswer(
			hotSpotQuestion.id,
			hotSpotQuestion.isCoordinateWithinRange(x, y),
			undefined,
			undefined,
			x,
			y,
		);
		// push to the database if necessary
		user?.addOrUpdateAnswer(attemptedAnswer);
	};

	// load the right question type based on what question we are on currently
	const renderQuestion = (currentIndex: number) => {
		if (exam !== undefined) {
			// get the question and attempted answer
			const question = exam.questions[currentIndex];
			const attemptedAnswer = user?.attemptedAnswerForID(question.id);
			// check what question type we need to load
			if (question.type === QuestionType.MultipleChoice) {
				return (
					<MultipleChoiceUI
						onClick={multipleChoiceQuestionClicked}
						attemptedAnswer={attemptedAnswer}
						question={question}
					/>
				);
			} else if (
				question.type === QuestionType.MultipleChoiceMultipleCorrect
			) {
				return (
					<SelectAllUI
						onClick={multipleChoiceMultipleCorrectQuestionClicked}
						attemptedAnswer={attemptedAnswer}
						question={exam.questions[currentIndex]}
					/>
				);
			} else if (question.type === QuestionType.Match) {
				return (
					<DisplayMatchQuestion
						didAnswer={matchQuestionAnswered}
						attemptedAnswer={attemptedAnswer}
						matchQuestion={question as MatchQuestion}
					/>
				);
			} else if (question.type === QuestionType.HotSpot) {
				return (
					<DisplayHotSpot
						question={question as HotSpotQuestion}
						answer={attemptedAnswer}
						onClick={hotSpotQuestionAnswered}
					/>
				);
			}
		} else {
			// display nothing if the question is invalid
			return "";
		}
	};

	return (
		<Page>
			{/* Load the user if they are undefined */}
			{user === undefined ? loadUser() : ""}
			<div className={styles.takeExam}>
				<div className={styles.titleBar}>
					<div className={styles.examName}> {exam?.name}</div>
					{/* {user?.attemptedAnswers.length === */}
					{/* exam?.questions.length ? ( */}
					<SubmitExamButton onClick={showScoringModal} />
					{/* ) : ( */}
					{/* <SubmitExamButton onClick={showNotDoneModal} /> */}
					{/* )} */}
				</div>
				{/* display the circle buttons for how many questions there are */}
				<div className={styles.circles}>
					<CircleButtonManager
						onClick={circleButtonClicked}
						exam={exam}
						currentIndex={userIndex}
					/>
				</div>
				{/* display arrow buttons to move to previous and next with the current question */}
				<div className={styles.arrowButtons}>
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
					<div className={styles.currentQuestion}>
						{userIndex + 1}
					</div>
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
				</div>
				<div className={styles.questionRow}>
					<div className={styles.questionsBox}>
						<div
							// change the styling to match question if we have a match question
							className={
								exam?.questions[userIndex].type ===
								QuestionType.Match
									? styles.matchQuestionContent
									: styles.questionContent
							}
						>
							{/* display the question */}
							{exam?.questions[userIndex].question}
							{renderQuestion(userIndex)}
						</div>
					</div>
				</div>
				{/* Unimplemented modal showing unanswered questions */}
				{/* {exam != undefined && user != undefined ? (
					<Modal show={showNotDone} onHide={closeNotDone}>
						<Modal.Body>
							You have{" "}
							{exam.questions.length -
								user.attemptedAnswers.length}{" "}
							unanswered questions! Are you sure you want to
							submit?
						</Modal.Body>
						<Modal.Footer>
							<SubmitExamButton onClick={showScoringModal} />
						</Modal.Footer>
					</Modal>
				) : (
					""
				)} */}
				{/* score the exam when a user hits submit */}
				{exam != undefined && user != undefined ? (
					<ScoringModal
						hide={showScoring}
						close={onExit}
						exam={exam}
						user={user}
					/>
				) : (
					""
				)}
			</div>
		</Page>
	);
};

export default Questions;
