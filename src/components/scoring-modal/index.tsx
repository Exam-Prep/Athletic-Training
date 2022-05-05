/** @format */

import React from "react";
import styles from "./styles.scss";
import { Exam } from "../../model/Exam";
import { Modal } from "react-bootstrap";
import QuestionScore from "../question-score";

interface ScoringModalProps {
	hide: boolean;
	close: () => void;
	exam: Exam;
}

const ScoringModal: React.FunctionComponent<ScoringModalProps> = ({
	hide,
	close,
	exam,
}) => {
	// get questions from exam
	console.log(exam);

	return (
		<Modal dialogClassName={styles.modal} show={hide} onHide={close}>
			<Modal.Header>
				<Modal.Title>Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.results}>
					{exam.questions.map((x) => {
						console.log(x);
						return (
							<div key={x.id}>
								<QuestionScore
									question={x.question}
									correctAnswer={x.correctAnswers}
								/>
							</div>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<button className={styles.closeButton} onClick={close}>
					Exit Exam
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default ScoringModal;
