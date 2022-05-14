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
			{/* <button
				className={admin ? styles.infoButton : styles.hidden}
				type='button'
				id='dropdownMenu2'
				data-toggle='dropdown'
				aria-haspopup='true'
				aria-expanded='false'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					fill='currentColor'
					className='bi bi-info-circle'
					viewBox='0 0 16 16'
				>
					<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
					<path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' />
				</svg>
			</button> */}
			{/* <DropdownButton id='dropdown-item-button' className= {admin ? styles.infoButton : styles.hidden}>
				<Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
				<Dropdown.Item as='button'>Action</Dropdown.Item>
				<Dropdown.Item as='button'>Another action</Dropdown.Item>
				<Dropdown.Item as='button'>Something else</Dropdown.Item>
			</DropdownButton> */}
			{currentExam != undefined ? <DropdownInfo examToDelete={currentExam} /> : ""}

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
