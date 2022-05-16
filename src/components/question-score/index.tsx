/** @format */
import React from "react";
import styles from "./styles.scss";
import { Question, QuestionType } from "../../model/Question";
import { AttemptedAnswer } from "../../model/User";
import MatchQuestion from "../../model/MatchQuestion";

interface QuestionScoreProps {
	question: Question | MatchQuestion;
	attempts: AttemptedAnswer[];
}

const QuestionScore: React.FunctionComponent<QuestionScoreProps> = ({
	question,
	attempts,
}) => {
	let answer = undefined;
	let matchAnswer = undefined;
	if (question.type === QuestionType.Match) {
		matchAnswer = question.answerMapArray();
	} else {
		answer = question.correctAnswers();
	}

	let attempt = undefined;
	for (let i = 0; i < attempts.length; i++) {
		if (attempts[i].qID === question.id) {
			attempt = attempts[i];
			break;
		}
	}
	return (
		<div className={styles.scoreBox}>
			<div className={styles.scoreText}>
				<div className={styles.titleText}>Question: </div>
				<div className={styles.bodyText}>{question.question}</div>
				<div className={styles.titleText}>Correct Answer: </div>
				{answer === undefined ? (
					matchAnswer?.map((x) => {
						return (
							<div className={styles.bodyText} key={x.answerID}>
								{x.key} : {x.value}
							</div>
						);
					})
				) : (
					<div className={styles.bodyText}>
						{answer[0].answerText}{" "}
					</div>
				)}
				<div className={styles.titleText}>Your Answer: </div>
				{answer === undefined ? (
					attempt?.answerMapArray().map((x) => {
						return (
							<div className={styles.bodyText} key={x.key}>
								{x.key} : {x.value}
							</div>
						);
					})
				) : (
					<div className={styles.bodyText}>{attempt?.answer[0]}</div>
				)}
			</div>
			<div className={styles.scoreIcon}>
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
