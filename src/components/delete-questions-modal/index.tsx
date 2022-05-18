/** @format */

import React, { useState, useEffect } from "react";
import styles from "./styles.scss";
import { Modal } from "react-bootstrap";
import { Exam, loadPartialExam } from "../../model/Exam";
import DeleteQuestions from "../delete-questions";

interface DeleteQuestionsModalProps {
	hide: boolean;
	close: () => void;
	exam: Exam;
}

const DeleteQuestionsModal: React.FunctionComponent<
	DeleteQuestionsModalProps
> = ({ hide, close, exam }) => {
	const [examQuestions, setExamQuestions] = useState();
	useEffect(() => {
		loadQuestions(exam);
	}, []);

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
				<div className={styles.quetions}>
					{examQuestions?.questions.map((x) => {
						return (
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
					Cancel
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteQuestionsModal;
