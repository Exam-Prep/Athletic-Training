/** @format */

import React from "react";
import styles from "./styles.scss";

interface SubmitExamButtonProps {
	onClick: () => void;
}

const SubmitExamButton: React.FunctionComponent<SubmitExamButtonProps> = ({
	onClick,
}) => {
	return (
		<button className={styles.submitExam} onClick={onClick}>
			Submit Exam
		</button>
	);
};

export default SubmitExamButton;
