/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import { Answer, Question } from "../../model/Question";
import Checkbox from "../check-box";

interface MultipleChoiceProps {
	onClick: (question: Question, index: number) => void;
	question: Question;
}

const MultipleChoiceUI: React.FunctionComponent<MultipleChoiceProps> = ({
	onClick,
	question,
}) => {
	const [isChecked, setIsChecked] = useState<Array<boolean>>([]);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		setIsChecked((existingIsChecked) => {
			existingIsChecked = existingIsChecked.map((x) => {
				return false;
			});
			existingIsChecked[index] = e.target.checked;
			return [...existingIsChecked];
		});
		onClick(question, index);
	};

	useEffect(() => {
		setIsChecked(
			question.answers?.map((x) => {
				return false;
			}),
		);
	}, []);

	function readCheckState(index: number) {
		if (isChecked[index] === undefined) {
			return false;
		} else {
			return isChecked[index];
		}
	}

	return (
		<div className={styles.multipleChoiceBox}>
			<div className={styles.questionsContainer}>Question</div>

			<div className={styles.directionsText}>
				Select The Correct Answer
			</div>

			<div className={styles.answerContainer}>
				<div className={styles.container}>
					{question.answers?.map((x: Answer, index) => {
						return (
							<div className={styles.container} key={x.answerID}>
								<div className='container'>
									<div>
										<Checkbox
											handleChange={(e) => {
												handleChange(e, index);
											}}
											isChecked={readCheckState(index)}
											label={x.answerText}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
export default MultipleChoiceUI;
