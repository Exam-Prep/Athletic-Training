/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Exam } from "../../model/Exam";
import { Modal } from "react-bootstrap";

interface CreateNewExamProps {
	hide: boolean;
	close: () => void;
}

const CreateNewExam: React.FunctionComponent<CreateNewExamProps> = ({
	hide,
	close,
}) => {
	const [examName, setExamName] = useState("");
	const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

	// set the new exam
	const onSubmitExam = () => {
		let exam: Exam;
		if (selectedExam === null) {
			exam = new Exam();
			exam.name = examName;
		} else {
			//This is a safe unwrap.
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			exam = selectedExam!;
		}

		exam.writeExam();
	};

	// create a new exam, close the modal, reload the page
	const create = () => {
		onSubmitExam();
		close();
		window.location.reload();
	};

	return (
		<Modal show={hide} onHide={close}>
			<Modal.Header>
				<Modal.Title>Create New Exam</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/* give your new exam a name */}
				<input
					className={styles.input}
					type='text'
					value={examName}
					onChange={(e) => {
						setExamName(e.target.value);
						setSelectedExam(null);
					}}
					placeholder='Exam name'
				/>
			</Modal.Body>
			<Modal.Footer>
				<button className={styles.addExamButton} onClick={create}>
					Create New Exam
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateNewExam;
