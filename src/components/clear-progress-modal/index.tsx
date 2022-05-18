/** @format */

import React from "react";
import { Exam } from "../../model/Exam";
import { User } from "../../model/User";
import { Button, Modal } from "react-bootstrap";

interface ClearProgressModalProps {
	close: () => void; // close the modal
	hide: boolean; // show/hide modal
	exam: Exam; // Exam we are in
	user: User; // current user
}

const ClearProgressModal: React.FunctionComponent<ClearProgressModalProps> = ({
	close,
	hide,
	exam,
	user,
}) => {
	const deleteProgress = () => {
		// remove progress from firebase
		user.deleteExamProgress(exam);
		close();
	};
	// confirm delete before actually deleting progress
	return (
		<Modal show={hide} onHide={close}>
			<Modal.Body>
				Are you sure you want to delete your progress?
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={deleteProgress}>Delete</Button>
				<Button onClick={close}>Cancel</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ClearProgressModal;
