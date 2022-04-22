/** @format */
import React, { useEffect, useState } from "react";
import Page from "../page";
import styles from "./styles.scss";
import ExamTile from "../../../exam-tile";
import { useNavigate } from "react-router-dom";
import { Exam, getPartialExams } from "../../../../model/Exam";
import CreateNewExam from "../../../create-new-exam";

const ExamList = () => {
	const [show, setShow] = useState(false);
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
				{exams?.map((x) => {
					return (
						<div className={styles.examsBox} key={x.id}>
							<ExamTile
								onClick={navigateToExam}
								name={x.name}
								currentExam={x}
								admin={true} // This will need to be changed once we can tell if the user is an admin
							/>
						</div>
					);
				})}
				<div className={styles.examsBox}>
					<ExamTile
						onClick={addExam}
						name={"Add New Exam"}
						addExam
						admin={false}
					/>
				</div>
				<CreateNewExam hide={show} close={closeModal} />
			</div>
		</Page>
	);
};

export default ExamList;
