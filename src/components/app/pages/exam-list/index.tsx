/** @format */
import React, { useEffect, useState } from "react";
import Page from "../page";
import styles from "./styles.scss";
import ExamTile from "../../../exam-tile";
import { useNavigate } from "react-router-dom";
import { Exam, getPartialExams } from "../../../../model/Exam";
import CreateNewExam from "../../../create-new-exam";

// the page that lists available exams for the user to take
const ExamList = () => {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const [exams, setExams] = useState<Exam[]>();

	// fetch the name and last question of the exams from the database
	useEffect(() => {
		getPartialExams()
			.then((x) => setExams(x))
			.catch(() => console.error("error fetching exams"));
	}, []);

	// navigate to the exam taking page
	const navigateToExam = (exam: Exam) => {
		navigate("/questions", { state: exam.id });
	};

	// show and hide the modal allowing users to add a new exam
	const addExam = () => setShow(true);
	const closeModal = () => setShow(false);

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
				{/* map all existing exams to be displayed nicely */}
				{exams?.map((x) => {
					return (
						<div className={styles.examsBox} key={x.id}>
							<ExamTile
								onClick={() => {
									navigateToExam(x);
								}}
								name={x.name}
								currentExam={x}
								admin={true} // future: set value based on user's admin status
							/>
						</div>
					);
				})}
				{/* use an exam tile to place add new exam button in line with exams */}
				<div className={styles.examsBox}>
					<ExamTile
						onClick={addExam}
						name={"Add New Exam"}
						addExam
						admin={false}
					/>
				</div>
				{/* modal to create a new exam */}
				<CreateNewExam hide={show} close={closeModal} />
			</div>
		</Page>
	);
};

export default ExamList;
