/** @format */

import React, { useState, useEffect } from "react";
import styles from "./styles.scss";
import { Modal } from "react-bootstrap";
import { Exam, loadPartialExam } from "../../model/Exam";
import DeleteQuestions from "../delete-questions";
import { Question } from "../../model/Question";

interface DeleteQuestionsModalProps {
	hide: boolean;
	close: () => void;
	exam: Exam;
}

const DeleteQuestionsModal: React.FunctionComponent<
	DeleteQuestionsModalProps
> = ({ hide, close, exam }) => {
	const [examQuestions, setExamQuestions] = useState<Exam | undefined>(
		undefined,
	);
	// load the questions into the exam
	useEffect(() => {
		loadQuestions(exam);
	}, []);

	// download the exam questions from the database if it hasn't been done already
	const loadQuestions = (loadExam: Exam) => {
		loadPartialExam(loadExam.id!).then((loadedExam) => {
			loadedExam
				.downloadExistingQuestionsIfNecessary()
				.then((actualExam) => setExamQuestions(actualExam));
		});
	};
	return (
		<Modal dialogClassName={styles.modal} show={hide} onHide={close}>
			<Modal.Header>Exam Questions</Modal.Header>
			<Modal.Body>
				<div className={styles.questions}>
					{examQuestions?.questions.map((x) => {
						return (
							// display the data in the deleteQuestions component
							<div className={styles.section} key={x.id}>
								<DeleteQuestions
									question={x}
									exam={examQuestions}
									loadQuestions={loadQuestions}
								/>
							</div>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button className={styles.closeButton} onClick={close}>
					Close
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteQuestionsModal;
