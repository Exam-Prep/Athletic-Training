/** @format */

import React from "react";
import styles from "./styles.scss";



interface SubmitExamButtonProps {
	onClick: () => void;
	text: string;
}


const SubmitExamButton: React.FunctionComponent<SubmitExamButtonProps> = ({
	onClick,
	text,
}) => {
return (
		<button
		className={styles.submitExam}
			onClick={onClick}
		>
			<span className={styles.text}>{text}</span>
		</button>
	);
};
		
export default SubmitExamButton;