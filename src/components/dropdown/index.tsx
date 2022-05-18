/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Exam } from "../../model/Exam";
import { User } from "../../model/User";
import DeleteQuestionsModal from "../delete-questions-modal";
import ClearProgressModal from "../clear-progress-modal";

interface DropdownProps {
	examToDelete: Exam; // current exam
	user: User; // current user
}

const DropdownInfo: React.FunctionComponent<DropdownProps> = ({
	examToDelete,
	user,
}) => {
	const [show, setShow] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [showDeleteQuestions, setShowDeleteQuestions] = useState(false);
	const [isQuestionDeleteOpen, setIsQuestionDeleteOpen] = useState(false);
	const [showClear, setClear] = useState(false);
	const [isClearOpen, setIsClearOpen] = useState(false);
	// delete an exam
	const deleteExam = () => {
		// delete the questions from an exam
		examToDelete.deleteExamQuestions();
		// delete the exam itself
		examToDelete.deleteExam();
		closeModal();
		window.location.reload();
	};
	// set state for delete exam modal
	const showModal = () => {
		if (isOpen) {
			setShow(false);
			setIsOpen(false);
		} else {
			setShow(true);
			setIsOpen(true);
		}
	};
	// close delete exam modal
	const closeModal = () => {
		setIsOpen(true);
	};
	// set state for delete question modal
	const showQuestions = () => {
		if (isQuestionDeleteOpen) {
			setShowDeleteQuestions(false);
			setIsQuestionDeleteOpen(false);
		} else {
			setShowDeleteQuestions(true);
			setIsQuestionDeleteOpen(true);
		}
	};
	// set state for clear progress modal
	const showClearModal = () => {
		if (isClearOpen) {
			setClear(false);
			setIsClearOpen(false);
		} else {
			setClear(true);
			setIsClearOpen(true);
		}
	};
	return (
		<Dropdown className={styles.dropDown}>
			{/* Display an info icon as the dropdown button */}
			<Dropdown.Toggle className={styles.infoButton}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					className='bi bi-info-circle'
					viewBox='0 0 16 16'
				>
					<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
					<path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' />
				</svg>
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{/* Delete Exam
					Call the modal that confirms this action
				*/}
				<Dropdown.Item as='button' onClick={showModal}>
					<Modal
						onClose={() => setShow(false)}
						show={show}
						onHide={showModal}
					>
						<Modal.Body>
							Do you want to delete this exam?
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={deleteExam}> Delete</Button>
							<Button onClick={showModal}>Cancel</Button>
						</Modal.Footer>
					</Modal>
					Delete Exam
				</Dropdown.Item>
				{/* Delete Questions
					Call the modal that confirms this action
				*/}
				<Dropdown.Item as='button' onClick={showQuestions}>
					<DeleteQuestionsModal
						close={() => setShowDeleteQuestions(false)}
						hide={showDeleteQuestions}
						exam={examToDelete}
					/>
					Delete Questions
				</Dropdown.Item>
				{/* Delete Exam Progress
					Call the modal that confirms this action
				*/}
				<Dropdown.Item as='button' onClick={showClearModal}>
					<ClearProgressModal
						close={() => setClear(false)}
						hide={showClear}
						exam={examToDelete}
						user={user}
					/>
					Delete Exam Progress
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownInfo;
