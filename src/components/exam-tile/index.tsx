/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Exam } from "../../model/Exam";
import QuestionWriterUI from "../questions-box";

interface ExamTileProps {
	onClick: () => void;
	name: string;
	currentExam?: Exam;
	addExam?: boolean;
	admin: boolean; // use this boolean once we have a way to check if a user is the admin
}

const ExamTile: React.FunctionComponent<ExamTileProps> = ({
	onClick,
	name,
	currentExam,
	addExam,
	admin,
}) => {
	const [show, setShow] = useState(false);
	const showModal = () => setShow(true);
	const closeModal = () => setShow(false);

	return (
		<div className={styles.examTile}>
			<div className={styles.buttonBox}>
				<button
					className={
						addExam ? styles.addExamButton : styles.examButton
					}
					onClick={onClick}
				>
					{name}
				</button>
				<button
					className={admin ? styles.addExamButton : styles.hidden}
					onClick={showModal}
				>
					Add Question
				</button>
			</div>
			<QuestionWriterUI
				hide={show}
				close={closeModal}
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				selectedExam={currentExam!}
			/>
		</div>
	);
};

export default ExamTile;
