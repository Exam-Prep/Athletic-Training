/** @format */

import React from "react";
import styles from "./styles.scss";
import { Modal } from "react-bootstrap";
import { Exam } from "../../model/Exam";
import DeleteQuestions from "../delete-questions";

interface DeleteQuestionsModalProps {
	hide: boolean;
	close: () => void;
	exam: Exam;
}

const DeleteQuestionsModal: React.FunctionComponent<
	DeleteQuestionsModalProps
> = ({ hide, close, exam }) => {
	return (
		<Modal dialogClassName={styles.modal} show={hide} onHide={close}>
			<Modal.Header>Exam Questions</Modal.Header>
			<Modal.Body>
				<div className={styles.results}>
					{exam.questions.map((x) => {
						return (
							<div className={styles.section} key={x.id}>
								<DeleteQuestions question={x} />
							</div>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button onClick={close}>Cancel</button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteQuestionsModal;
