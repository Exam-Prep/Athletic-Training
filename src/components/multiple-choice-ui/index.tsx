/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import { Answer, Question } from "../../model/Question";
import Checkbox from "../check-box";
import { AttemptedAnswer } from "../../model/User";

interface MultipleChoiceProps {
	onClick: (question: Question, index: number) => void;
	question: Question;
	attemptedAnswer: AttemptedAnswer | undefined;
}

const MultipleChoiceUI: React.FunctionComponent<MultipleChoiceProps> = ({
	onClick,
	attemptedAnswer,
	question,
}) => {
	const [isChecked, setIsChecked] = useState<Array<boolean>>(() => {
		// default state is unanswered
		const checked = [false, false, false, false, false];
		for (let i = 0; i < question.answers.length; i++) {
			for (let j = 0; j < attemptedAnswer?.answer?.length; j++) {
				if (
					question.answers[i].answerText ===
					attemptedAnswer?.answer[j]
				) {
					// if there is an answer recorded, mark it answered on front end
					checked[i] = true;
				}
			}
		}
		return checked;
	});
	// when something is changed, update state
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		// set the proper answer to be checked
		setIsChecked((existingIsChecked) => {
			existingIsChecked = existingIsChecked.map((x) => {
				return false;
			});
			existingIsChecked[index] = e.target.checked;
			return [...existingIsChecked];
		});
		onClick(question, index);
	};

	// render state when a question is changed
	useEffect(() => {
		setIsChecked(
			question.answers?.map((x) => {
				if (attemptedAnswer?.answer?.includes(x.answerText)) {
					return true;
				}
				return false;
			}),
		);
	}, [question]);

	// if the check state is undefined, make it false, otherwise leave it be
	function readCheckState(index: number) {
		if (isChecked[index] === undefined) {
			return false;
		} else {
			return isChecked[index];
		}
	}

	return (
		<div className={styles.multipleChoiceBox}>
			<div className={styles.questionsContainer}></div>
			{/* display the image if there is one */}
			{question.imageURL !== "" ? (
				<img className={styles.image} src={question.imageURL} />
			) : (
				""
			)}
			{/* instructions */}
			<div className={styles.directionsText}>
				Select The Correct Answer
			</div>

			<div className={styles.answerContainer}>
				<div className={styles.container}>
					{/* map all answers */}
					{question.answers?.map((x: Answer, index) => {
						return (
							<div className={styles.container} key={x.answerID}>
								<div className='container'>
									<div>
										<Checkbox
											isRadio // make the checkboxes into radios
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
