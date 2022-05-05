/** @format */
import React from "react";
import styles from "./styles.scss";
import { Answer } from "../../model/Question";

interface QuestionScoreProps {
	question: string;
	correctAnswer: () => Answer[];
	last?: boolean;
}

const QuestionScore: React.FunctionComponent<QuestionScoreProps> = ({
	question,
	correctAnswer,
	last,
}) => {
	return (
		<div className={styles.scoreBox}>
			<div className={last ? styles.lastSection : styles.section}>
				{question}
				{correctAnswer}
			</div>
		</div>
	);
};

export default QuestionScore;
