/** @format */
import React from "react";
import styles from "./styles.scss";
import { Question, Answer } from "../../model/Question";
import MatchQuestion from "../../model/MatchQuestion";

interface QuestionScoreProps {
	question: Question | MatchQuestion;
}

const QuestionScore: React.FunctionComponent<QuestionScoreProps> = ({
	question,
}) => {
	let answer = question.correctAnswers();
	if (answer.length === 0) {
		answer = question.answerMapArray();
	}
	return (
		<div className={styles.scoreBox}>
			<div>Question: {question.question}</div>
			{answer.map((x) => {
				return <div key={x.answerID}>Correct Answer: {x.value}</div>;
			})}
			<div>Your Answer: </div>
		</div>
	);
};

export default QuestionScore;
