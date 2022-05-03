/** @format */

import React from "react";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalculator,
	faFlag,
	faHand,
	faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

const QuestionToolBar = () => {
	return (
		<div className={styles.questionToolBar}>
			<div className={styles.section}>
				<span>Time remaining:</span>
				<button className={styles.number} onClick={() => alert("Time")}>
					0
				</button>
			</div>
			<div className={styles.section}>
				<button
					className={styles.number}
					onClick={() => alert("Not Answered")}
				>
					0
				</button>
				<span>Not Answered</span>
				<div className={styles.dividedSection} />
				<button
					className={styles.number}
					onClick={() => alert("Completed")}
				>
					0
				</button>
				<span>Completed</span>
			</div>
			<div className={styles.section}>
				<button
					className={styles.icon}
					onClick={() => alert("Flagged Question")}
				>
					<FontAwesomeIcon icon={faFlag} />
				</button>
				<button
					className={styles.number}
					onClick={() => alert("Flagged")}
				>
					0
				</button>
				<span>Flagged Questions</span>
			</div>
			<div className={styles.section}>
				<button
					className={styles.icon}
					onClick={() => alert("Calculator")}
				>
					<FontAwesomeIcon icon={faCalculator} />
				</button>
				<span>Calculator</span>
			</div>
			<div className={styles.section}>
				<button
					className={styles.icon}
					onClick={() => alert("Question Help")}
				>
					<FontAwesomeIcon icon={faQuestionCircle} />
				</button>
				<span>Help</span>
			</div>
			<div className={styles.lastSection}>
				<button
					className={styles.icon}
					onClick={() => alert("Take a Break")}
				>
					<FontAwesomeIcon icon={faHand} />
				</button>
				<span>Take a Break</span>
			</div>
		</div>
	);
};

export default QuestionToolBar;
