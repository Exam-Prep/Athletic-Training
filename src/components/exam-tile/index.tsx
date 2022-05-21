/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Exam } from "../../model/Exam";
import QuestionWriterUI from "../questions-box";
import DropdownInfo from "../dropdown";

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
			{addExam ? (
				<div className={styles.empty} />
			) : (
				// display the info button if this is an exam
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				<DropdownInfo examToDelete={currentExam!} />
			)}

			<div className={styles.buttonBox}>
				{/* name of the exam */}
				<button
					className={
						addExam ? styles.addExamButton : styles.examButton
					}
					onClick={onClick}
				>
					{name}
				</button>
				{/* add question button is visible if user is an admin */}
				{admin && (
					<button
						className={styles.addExamButton}
						onClick={showModal}
					>
						Add Question
					</button>
				)}
			</div>
			{/* open the question creation modal if you click add question */}
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
