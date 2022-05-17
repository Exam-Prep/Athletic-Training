/** @format */

import React from "react";
import styles from "./styles.scss";
import { Question, QuestionType } from "../../model/Question";
import { AttemptedAnswer } from "../../model/User";
import MatchQuestion from "../../model/MatchQuestion";

interface DeleteQuestionsProps {
	question: Question | MatchQuestion;
}

const DeleteQuestions: React.FunctionComponent<DeleteQuestionsProps> = ({
	question,
}) => {
	return <div></div>;
};

export default DeleteQuestions;
