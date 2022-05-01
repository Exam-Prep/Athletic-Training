/** @format */

import React from "react";
import styles from "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalculator,
	faCoffee,
	faFileCircleQuestion,
	faFlag,
	faHand,
	faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

<link
	rel='stylesheet'
	href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
></link>;

const QuestionToolBar = () => {
	return (
		<div className={styles.questionToolBar}>
			<div className={styles.timeRemainingText}> Time remaining</div>
			<div className={styles.timeLeftOnExam}>0</div>

			<div className={styles.toolBoxLine1}></div>

			<div className={styles.questionsCompleted}> 0 </div>
			<div className={styles.questionsCompletedText}>Completed </div>

			<div className={styles.toolHalfBoxLine}></div>

			<div className={styles.questionsNotCompletedText}>
				Not Completed{" "}
			</div>
			<div className={styles.questionsNotCompleted}> 0 </div>

			<div className={styles.toolBoxLine2}></div>

			<div className={styles.flaggedIcon}>
				<FontAwesomeIcon icon={faFlag} />
			</div>
			<div className={styles.questionsFlagged}> 0 </div>
			<div className={styles.questionsFlaggedText}>
				Flagged Questions{""}
			</div>

			<div className={styles.toolBoxLine3}></div>

			<div className={styles.calculatorIcon}>
				<FontAwesomeIcon icon={faCalculator} />
			</div>

			<div className={styles.helpIcon}>
				<FontAwesomeIcon icon={faQuestionCircle} />
			</div>

			<div className={styles.toolBoxLine4}></div>

			<div className={styles.takeBreakIcon}>
				<FontAwesomeIcon icon={faHand} />
			</div>

			<div className={styles.toolBoxLineA}></div>
			<div className={styles.toolBoxLineB}></div>
			<div className={styles.toolBoxLineC}></div>
			<div className={styles.toolBoxLineD}></div>
		</div>
	);
};

export default QuestionToolBar;
