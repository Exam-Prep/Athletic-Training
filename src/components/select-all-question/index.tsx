/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import { Answer, Question } from "../../model/Question";
import Checkbox from "../check-box";
import { AttemptedAnswer } from "../../model/User";

interface MultipleChoiceMultipleCorrectProps {
	onClick: (
		question: Question,
		selectedValues: Array<number | undefined>,
	) => void;
	attemptedAnswer: AttemptedAnswer | undefined;
	question: Question;
}

const SelectAllUI: React.FunctionComponent<
	MultipleChoiceMultipleCorrectProps
> = ({ onClick, attemptedAnswer, question }) => {
	const [isChecked, setIsChecked] = useState<Array<boolean>>(() => {
		const checks = [false, false, false, false, false];
		for (let i = 0; i < attemptedAnswer?.answer?.length; i++) {
			for (let j = 0; j < question.answers.length; j++) {
				if (
					question.answers[j].answerText ===
					attemptedAnswer?.answer[i]
				) {
					checks[j] = true;
				}
			}
		}
		return checks;
	});
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		setIsChecked((existingIsChecked) => {
			existingIsChecked[index] = e.target.checked;
			return [...existingIsChecked];
		});
	};

	useEffect(() => {
		const selectedValues = isChecked.map((x, isCheckedIndex) => {
			return x === true ? isCheckedIndex : undefined;
		});
		onClick(question, selectedValues);
	}, [isChecked]);

	useEffect(() => {
		setIsChecked(() => {
			const checks = [false, false, false, false, false];
			for (let i = 0; i < attemptedAnswer?.answer?.length; i++) {
				for (let j = 0; j < question.answers.length; j++) {
					if (
						question.answers[j].answerText ===
						attemptedAnswer?.answer[i]
					) {
						checks[j] = true;
					}
				}
			}
			return checks;
		});
	}, [attemptedAnswer]);

	function readCheckState(index: number) {
		if (isChecked[index] === undefined) {
			return false;
		} else {
			return isChecked[index];
		}
	}

	return (
		<div className={styles.multipleChoiceMultipleCorrectBox}>
			{question.imageURL !== "" ? (
				<img className={styles.image} src={question.imageURL} />
			) : (
				""
			)}{" "}
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
