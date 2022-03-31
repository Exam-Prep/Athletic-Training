/** @format */

import React from "react";
import { useState } from "react";
import styles from "./styles.scss";


const onClickCalculator = () => {

}

const QuestionToolBar = () => {

	return (
		<div className={styles.questionToolBar}>
			<div className={styles.timeRemaining}> Time remaining</div>
			<div className={styles.timeLeftOnExam}> 3:00</div>
			<div className={styles.questionsCompletedText}>
				Questions Completed{" "}
			</div>
			<div className={styles.questionsCompleted}> 0 </div>
			<div className={styles.questionsNotCompletedText}>
				Not Completed{" "}
			</div>
			<div className={styles.questionsNotCompleted}> 0 </div>

			<div className={styles.toolBoxLineA}></div>
			<div className={styles.toolBoxLineB}></div>
			<div className={styles.toolBoxLineC}></div>
			<div className={styles.toolBoxLineD}></div>
		</div>
	);
};

export default QuestionToolBar;
