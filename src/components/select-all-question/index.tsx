/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import { Answer, Question } from "../../model/Question";
import Checkbox from "../check-box";

interface MultipleChoiceMultipleCorrectProps {
	onClick: (
		question: Question,
		selectedValues: Array<number | undefined>,
	) => void;
	question: Question;
}

const SelectAllUI: React.FunctionComponent<
	MultipleChoiceMultipleCorrectProps
> = ({ onClick, question }) => {
	const [isChecked, setIsChecked] = useState<Array<boolean>>([]);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		setIsChecked((existingIsChecked) => {
			existingIsChecked[index] = e.target.checked;
			return [...existingIsChecked];
		});
		const selectedValues = isChecked.map((x, isCheckedIndex) => {
			return x === true ? isCheckedIndex : undefined;
		});
		onClick(question, selectedValues);
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
		<div className={styles.multipleChoiceMultipleCorrectBox}>
			<div className={styles.questionsContainer}>Question</div>

			<div className={styles.directionsText}>Check all that apply</div>

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
export default SelectAllUI;
