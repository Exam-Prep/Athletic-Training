/** @format */

import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import { Answer, Question, QuestionType } from "../../model/Question";
import Checkbox from "../check-box";



interface MultipleChoiceMultipleCorrectProps {
	
	onClick: (question: Question) => void;
	question: Question;

}

const MultipleChoiceMultipleCorrect: React.FunctionComponent<MultipleChoiceMultipleCorrectProps> = ({
	onClick,
	question,
}) => {

		const [isCheckedA, setIsCheckedA] = useState(false);
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setIsCheckedA(e.target.checked);
		};
		
	return (
		<div>
			<div className={styles.questionsContainer}>
				<h2>Question</h2>
			</div>

			<div className={styles.answerContainer}>
				<div className={styles.container}>
					{question.answers?.map((x: any) => {
						return (
							<div className={styles.container} key={x.id}>
								<div className='container'>
									<div>
										{console.log(x.answertext)}
										<Checkbox
											handleChange={handleChange}
											isChecked={isCheckedA}
											label= {x.answerText}
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
}
export default MultipleChoiceMultipleCorrect;

