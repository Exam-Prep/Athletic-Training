/** @format */

import React from "react";
import styles from "./styles.scss";

interface UploadImageProps {
	onClick: () => void;
	text: string;
}

const UploadImageButton: React.FunctionComponent<UploadImageProps> = ({
	onClick,
	text,
}) => {
	return (
		<button className={styles.submitExam} onClick={onClick}>
			<span className={styles.text}>{text}</span>
		</button>
	);
};
