/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Question, QuestionType, Answer } from "../../model/Question";
import { Exam } from "../../model/Exam";
import MatchQuestion from "../../model/MatchQuestion";
import TrashCanButton from "../trash-can-button";
import { Modal, Button } from "react-bootstrap";
import PreviewHotSpotAnswer from "../preview-hot-spot-answer";
import HotSpotQuestion from "../../model/HotSpotQuestion";

interface DeleteQuestionsProps {
	question: Question | MatchQuestion;
	exam: Exam;
	loadQuestions: (loadExam: Exam) => void;
}

const DeleteQuestions: React.FunctionComponent<DeleteQuestionsProps> = ({
	question,
	exam,
	loadQuestions,
}) => {
	let answer: Answer[] | undefined = undefined;
	let matchAnswer:
		| {
				key: string;
				value: string;
		  }[]
		| undefined = undefined;
	if (question.type === QuestionType.Match) {
		matchAnswer = (question as MatchQuestion).answerMapArray();
	} else {
		answer = question.answers;
	}

	const [show, setShow] = useState(false);

	const showModal = () => setShow(true);
	const closeModal = () => setShow(false);

	const deleteQuestion = (e: Event) => {
		e.stopPropagation();
		exam.deleteQuestion(question);
		loadQuestions(exam);
		closeModal();
	};

	const openModal = (e: Event) => {
		e.stopPropagation();
		loadQuestions(exam);
		showModal();
	};

	const renderQuestion = () => {
		if (answer === undefined) {
			return matchAnswer?.map((x) => {
				return (
					<div className={styles.bodyText} key={x.key}>
						{x.key} : {x.value}
					</div>
				);
			});
		} else if (matchAnswer === undefined && answer.length > 0) {
			return answer?.map((x) => {
				return (
					<div
						className={
							x.isCorrect ? styles.correctText : styles.bodyText
						}
						key={x.answerID}
					>
						{x.answerText}{" "}
					</div>
				);
			});
		} else {
			return (
				<PreviewHotSpotAnswer
					question={question as HotSpotQuestion}
					answer={undefined}
				/>
			);
		}
	};

	return (
		<div className={styles.questionBox}>
			<div className={styles.questionText}>
				<div className={styles.titleText}>Question: </div>
				<div className={styles.bodyText}>{question.question}</div>
				<div className={styles.titleText}>Answers: </div>
				{renderQuestion()}
			</div>
			<div className={styles.deleteButtonArea}>
				<TrashCanButton click={openModal} />
			</div>
			<Modal
				onClose={() => setShow(false)}
				show={show}
				onHide={closeModal}
			>
				<Modal.Body>Do you want to delete this question?</Modal.Body>
				<Modal.Footer>
					<Button onClick={deleteQuestion}> Delete</Button>
					<Button onClick={closeModal}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default DeleteQuestions;
