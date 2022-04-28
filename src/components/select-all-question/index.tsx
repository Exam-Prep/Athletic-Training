/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import { Exam, getPartialExams } from "../../../../model/Exam";
import Checkbox from "../check-box";
import "./styles.css";

import CreateNewExam from "../create-new-exam";
import Questions from "../app/pages/questions";
 


export default function multipleCorrect() {
	const [isCheckedA, setIsCheckedA] = useState(false);
	const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsCheckedA(e.target.checked);
	};

	const [exams, setExams] = useState<Exam[]>();

	const [isCheckedB, setIsCheckedB] = useState(false);
	const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsCheckedB(e.target.checked);

	
	};

	useEffect(() => {
		getPartialExams()
			.then((x:any) => setExams(x))
			.catch(() => console.error("error fetching exams"));
	}, []);


	return (
		<div>
			<h2>Question</h2>

			<div className={styles.container}>
				{Exam.questions?.map((x:any) => {
					return (
						<div className={styles.container} key={x.id}>
							<div className='container'>
								<div>
									<Checkbox
										handleChange={handleChangeA}
										isChecked={isCheckedA}
										label='A'
									/>
									Answer1
										</div>
									);
							)
						<div>
									<Checkbox
										handleChange={handleChangeB}
										isChecked={isCheckedB}
										label='B'
									/>
									Answer2
										</div>
							</div>
							
				</div>
			</div>
		</div>
						
	));
}
		
