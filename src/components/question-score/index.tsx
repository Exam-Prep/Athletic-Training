/** @format */
import React, { useState, useRef, useLayoutEffect } from "react";
import styles from "./styles.scss";
import { Question, QuestionType, Answer } from "../../model/Question";
import { AttemptedAnswer } from "../../model/User";
import MatchQuestion from "../../model/MatchQuestion";
import HotSpotQuestion from "../../model/HotSpotQuestion";
import PreviewHotSpotAnswer from "../preview-hot-spot-answer";

interface QuestionScoreProps {
	question: Question;
	attempts: AttemptedAnswer[];
}

// shows answers given and correct answers for a question
const QuestionScore: React.FunctionComponent<QuestionScoreProps> = ({
	question,
	attempts,
}) => {
	const questionDividerRef = useRef<HTMLDivElement | null>(null);
	const [questionDividerWidth, setQuestionDividerWidth] = useState(0);
	let answer: Answer[] | undefined = undefined;
	let matchAnswer:
		| {
				key: string;
				value: string;
		  }[]
		| undefined = undefined;

	// determine what type of question this is and get data from appropriate place
	if (question.type === QuestionType.Match) {
		matchAnswer = (question as MatchQuestion).answerMapArray();
	} else {
		answer = question.correctAnswers();
	}

	// get question attempt for this question
	let attempt: AttemptedAnswer | undefined = undefined;
	for (let i = 0; i < attempts.length; i++) {
		if (attempts[i].qID === question.id) {
			attempt = attempts[i];
			break;
		}
	}

	// display correct answer
	const renderQuestionAnswer = () => {
		if (answer === undefined && matchAnswer !== undefined) {
			// print all match answer mappings
			return matchAnswer.map((x) => {
				return (
					<div className={styles.bodyText} key={x.key}>
						{x.key} : {x.value}
					</div>
				);
			});
		} else if (answer?.length === 0 && matchAnswer === undefined) {
			// print nothing if no answer
			return "";
		} else {
			// print all correct answers
			return answer?.map((x) => {
				return (
					<div className={styles.bodyText} key={x.answerID}>
						{x.answerText}
					</div>
				);
			});
		}
	};

	// display user's answer
	const renderAttemptedAnswer = () => {
		if (answer === undefined) {
			return attempt?.answerMapArray().map((x) => {
				return (
					<div className={styles.bodyText} key={x.key}>
						{x.key} : {x.value}
					</div>
				);
			});
		} else if (attempt?.answer !== undefined) {
			return attempt.answer.map((x) => {
				return (
					<div className={styles.bodyText} key={x}>
						{x}
					</div>
				);
			});
		}
	};

	// calculate proper divider width after all DOM changes
	useLayoutEffect(() => {
		setQuestionDividerWidth(questionDividerRef.current!.clientWidth);
	}, [questionDividerRef.current!]);

	// display all answers for this question
	const renderCorrectAndAttemptedAnswer = () => {
		if (answer?.length === 0 && matchAnswer === undefined) {
			return (
				<PreviewHotSpotAnswer
					question={question as HotSpotQuestion}
					answer={attempt}
					parentWidth={questionDividerWidth}
				/>
			);
		} else {
			return (
				<div>
					<div className={styles.titleText}>Correct Answer: </div>
					{renderQuestionAnswer()}
					<div className={styles.titleText}>Your Answer: </div>
					{renderAttemptedAnswer()}
				</div>
			);
		}
	};

	return (
		<div className={styles.scoreBox}>
			<div className={styles.scoreText} ref={questionDividerRef}>
				<div className={styles.titleText}>Question: </div>
				<div className={styles.bodyText}>{question.question}</div>
				{renderCorrectAndAttemptedAnswer()}
			</div>
			<div className={styles.scoreIcon}>
				{/* display appropriate icon based on correct or incorrect answer */}
				{attempt?.isCorrect ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='40'
						height='40'
						fill='green'
						className='bi bi-check'
						viewBox='0 0 16 16'
					>
						<path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z' />
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='40'
						height='40'
						fill='red'
						className='bi bi-x'
						viewBox='0 0 16 16'
					>
						<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
					</svg>
				)}
			</div>
		</div>
	);
};

export default QuestionScore;
