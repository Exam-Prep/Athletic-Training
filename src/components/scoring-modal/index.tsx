/** @format */

import React from "react";
import styles from "./styles.scss";
import { Exam } from "../../model/Exam";
import { User } from "../../model/User";
import { Modal } from "react-bootstrap";
import QuestionScore from "../question-score";

interface ScoringModalProps {
	hide: boolean;
	close: () => void;
	exam: Exam;
	user: User;
}

const ScoringModal: React.FunctionComponent<ScoringModalProps> = ({
	hide,
	close,
	exam,
	user,
}) => {
	const answers = user.attemptedAnswers;
	let correctAnswers = 0;

	for (let i = 0; i < answers.length; i++) {
		if (answers[i].isCorrect) {
			correctAnswers++;
		}
	}
	return (
		<Modal dialogClassName={styles.modal} show={hide} onHide={close}>
			<Modal.Header>
				<Modal.Title>Results</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className={styles.results}>
					{exam.questions.map((x) => {
						return (
							<div className={styles.section} key={x.id}>
								<QuestionScore
									question={x}
									attempts={answers}
								/>
							</div>
						);
					})}
					<div className={styles.titleText}>Score: </div>
					<div className={styles.bodyText}>
						{(correctAnswers / exam.questions.length) * 100}%
					</div>
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
