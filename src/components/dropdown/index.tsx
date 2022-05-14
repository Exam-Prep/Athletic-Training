/** @format */

import styled from "styled-components";
import React, { useState } from "react";
import styles from "./styles.scss";
import { Button, Dropdown, Modal, ModalContainer } from "react-bootstrap";
import { Exam } from "../../model/Exam";

//from https://stackoverflow.com/questions/58601704/adding-a-icon-to-react-bootstrap-dropdown
// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu

interface DropdownProps {
	examToDelete: Exam;
}

const Toggle = styled(Dropdown.Toggle)`
	:after {
		display: none;
	}
`;
const DropdownInfo: React.FunctionComponent<DropdownProps> = ({
	examToDelete,
}) => {
	const [show, setShow] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const cancelDelete = () => {
		console.log("yo you want to cancel delete");
		closeModal();
	};
	const deleteExam = () => {
		console.log("delete pressed", examToDelete.id);
		examToDelete.deleteExamQuestions();
		examToDelete.deleteExam();
		closeModal();
	};
	const showModal = () => {
		console.log("what is goingo n??", show);
		setShow(true);
		if (isOpen) {
			setShow(false)
		}
	};
	const closeModal = () => {
		setIsOpen(true);
	};
	return (
		<Dropdown className={styles.infoButton}>
			<Toggle />
			<Dropdown.Menu>
				{/* <Dropdown.ItemText >Dropdown item text</Dropdown.ItemText> */}
				<Dropdown.Item as='button' onClick={showModal}>
					<Modal
						onClose={() => setShow(false)}
						show={show}
						onHide={closeModal}
					>
						<Modal.Body>
							Do you wanat to delete this exam?
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={deleteExam}> Delete</Button>
							<Button onClick={cancelDelete}>Cancel</Button>
						</Modal.Footer>
					</Modal>
					Delete
				</Dropdown.Item>
				{/* <Dropdown.Item as='button'>Another action</Dropdown.Item> */}
				{/* <Dropdown.Item as='button'>Something else</Dropdown.Item> */}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropdownInfo;
