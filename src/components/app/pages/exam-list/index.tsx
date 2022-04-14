/** @format */
import React, { useEffect, useState } from "react";
import Page from "../page";
import styles from "./styles.scss";
import ExamTile from "../../../exam-tile";
import { useNavigate } from "react-router-dom";
import { Exam, getPartialExams } from "../../../../model/Exam";

const ExamList = () => {
	const navigate = useNavigate();
	const [exams, setExams] = useState<Exam[]>();
	useEffect(() => {
		getPartialExams()
			.then((x) => setExams(x))
			.catch(() => console.error("error fetching exams"));
	}, []);

	const navigateToExam = () => {
		navigate("/questions");
	};

	const addExam = () => {
		alert("add exam");
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
				{exams?.map((x) => {
					return (
						<div className={styles.examsBox} key={x.id}>
							<ExamTile onClick={navigateToExam} name={x.name} />
						</div>
					);
				})}
				<div className={styles.examsBox}>
					<ExamTile onClick={addExam} name={"Add New Exam"} addExam />
				</div>
			</div>
		</Page>
	);
};

export default ExamList;
