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

// modal that is used to display final score with correct and incorrect answers
const ScoringModal: React.FunctionComponent<ScoringModalProps> = ({
	hide,
	close,
	exam,
	user,
}) => {
	// eslint-disable-next-line prefer-const
	let answers = user.attemptedAnswers;
	let correctAnswers = 0;
	let k = 0;

	// get all answers for questions
	for (let i = 0; i < exam.questions.length; i++) {
		for (let j = 0; j < user.attemptedAnswers.length; j++) {
			if (exam.questions[i].id === user.attemptedAnswers[j].qID) {
				answers[k] = user.attemptedAnswers[j];
				k++;
			}
		}
	}

	// calculate number of correct answers
	for (let i = 0; i < exam.questions.length; i++) {
		if (answers[i]?.isCorrect) {
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
					{/* create a QuestionScore component for each question */}
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
					{/* calculate and display overall score */}
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
