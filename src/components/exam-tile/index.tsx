/** @format */

import React from "react";
import styles from "./styles.scss";

interface ExamTileProps {
	onClick: () => void;
	name: string;
	addExam?: boolean;
}

const ExamTile: React.FunctionComponent<ExamTileProps> = ({
	onClick,
	name,
	addExam,
}) => {
	return (
		<div className={styles.examTile}>
			<div className={styles.buttonBox}>
				<button
					className={
						addExam ? styles.addExamButton : styles.examButton
					}
					onClick={onClick}
				>
					{name}
				</button>
			</div>
		</div>
	);
};

export default ExamTile;
