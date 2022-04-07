/** @format */

import React from "react";
import styles from "./styles.scss";

interface ExamTileProps {
	onClick: () => void;
}

const ExamTile: React.FunctionComponent<ExamTileProps> = ({ onClick }) => {
	return (
		<div className={styles.examTile}>
			<div className={styles.buttonBox}>
				<button className={styles.examButton} onClick={onClick}>
					Exam Name
				</button>
			</div>
		</div>
	);
};

export default ExamTile;
