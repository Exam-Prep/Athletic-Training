/** @format */

import React, { useState, useRef, useLayoutEffect } from "react";
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
	// determine what value to delete from the database based on question type
	if (question.type === QuestionType.Match) {
		matchAnswer = (question as MatchQuestion).answerMapArray();
	} else {
		answer = question.answers;
	}
	const questionDividerRef = useRef<HTMLDivElement | null>(null);
	const [questionDividerWidth, setQuestionDividerWidth] = useState(0);
	const [show, setShow] = useState(false);

	const showModal = () => setShow(true);
	const closeModal = () => setShow(false);

	// delete the chosen question and reload the existing list
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

	useLayoutEffect(() => {
		setQuestionDividerWidth(questionDividerRef.current!.clientWidth);
	}, [questionDividerRef.current!]);

	const renderQuestion = () => {
		// display match answer if answer is undefined
		if (answer === undefined) {
			return matchAnswer?.map((x) => {
				return (
					<div className={styles.bodyText} key={x.key}>
						{x.key} : {x.value}
					</div>
				);
			});
			// display answer if match is undefined and there is an answer
		} else if (matchAnswer === undefined && answer.length > 0) {
			return answer?.map((x) => {
				return (
					<div
						className={
							// make the correct answers green
							x.isCorrect ? styles.correctText : styles.bodyText
						}
						key={x.answerID}
					>
						{x.answerText}{" "}
					</div>
				);
			});
		} else {
			// if not matching, multiple choice, or select all, then hot spot
			return (
				<div>
					<PreviewHotSpotAnswer
						question={question as HotSpotQuestion}
						answer={undefined}
						parentWidth={questionDividerWidth}
					/>
				</div>
			);
		}
	};

	return (
		<div className={styles.questionBox}>
			{/* display the question and its answers */}
			<div className={styles.questionText} ref={questionDividerRef}>
				<div className={styles.titleText}>Question: </div>
				<div className={styles.bodyText}>{question.question}</div>
				<div className={styles.titleText}>Answers: </div>
				{renderQuestion()}
			</div>
			{/* button to delete */}
			<div className={styles.deleteButtonArea}>
				<TrashCanButton click={openModal} />
			</div>
			{/* force a confirmation before deleting */}
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
