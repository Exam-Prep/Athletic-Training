/** @format */
import React, { useState } from "react";
import Page from "../page";
import styles from "./styles.scss";
import ExamTile from "../../../exam-tile";
import { useNavigate } from "react-router-dom";

const ExamList = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate("/questions");
	};

	return (
		<Page>
			<div className={styles.header}>
				<div className={styles.logo}>
					<div className={styles.athleti}>Athleti</div>
					<div className={styles.train}>Train</div>
					<div className={styles.whitworth}>
						by Whitworth University
					</div>
				</div>
				<div className={styles.headerBorder} />
			</div>
			<div className={styles.examBackground}>
				<div className={styles.examsBox}>
					<ExamTile onClick={onClick} />
				</div>
			</div>
		</Page>
	);
};

export default ExamList;
