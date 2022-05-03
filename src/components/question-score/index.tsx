/** @format */
import React from "react";
import styles from "./styles.scss";
import { Answer } from "../../model/Question";

interface QuestionScoreProps {
	question: string;
	correctAnswer: () => Answer[];
}

const QuestionScore: React.FunctionComponent<QuestionScoreProps> = ({
	question,
	correctAnswer,
}) => {
	return <div className={styles.scoreBox}></div>;
};

export default QuestionScore;
