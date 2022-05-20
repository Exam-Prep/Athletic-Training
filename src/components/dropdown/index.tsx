/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Exam } from "../../model/Exam";
import DeleteQuestionsModal from "../delete-questions-modal";

interface DropdownProps {
	examToDelete: Exam;
}

const DropdownInfo: React.FunctionComponent<DropdownProps> = ({
	examToDelete,
}) => {
	const [show, setShow] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [showDeleteQuestions, setShowDeleteQuestions] = useState(false);
	const [isQuestionDeleteOpen, setIsQuestionDeleteOpen] = useState(false);
	const deleteExam = () => {
		console.log("delete pressed", examToDelete.id);
		if (examToDelete.questions !== undefined) {
			examToDelete.deleteExamQuestions();
		}
		examToDelete.deleteExam();
		closeModal();
		window.location.reload();
	};
	const showModal = () => {
		if (isOpen) {
			setShow(false);
			setIsOpen(false);
		} else {
			setShow(true);
			setIsOpen(true);
		}
	};
	const closeModal = () => {
		setIsOpen(true);
	};
	const showQuestions = () => {
		if (isQuestionDeleteOpen) {
			setShowDeleteQuestions(false);
			setIsQuestionDeleteOpen(false);
		} else {
			setShowDeleteQuestions(true);
			setIsQuestionDeleteOpen(true);
		}
	};
	return (
		<Dropdown className={styles.dropDown}>
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
					Delete
				</Dropdown.Item>
				<Dropdown.Item as='button' onClick={showQuestions}>
					<DeleteQuestionsModal
						close={() => setShowDeleteQuestions(false)}
						hide={showDeleteQuestions}
						exam={examToDelete}
					/>
					Delete Questions
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownInfo;
