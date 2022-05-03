/** @format */
import React, { useState } from "react";
import CircleButton from "../circle-button";
import { Exam } from "../../model/Exam";
import { Question } from "../../model/Question";

interface CircleButtonManagerProps {
	onClick: (question: Question) => void;
	exam: Exam | undefined;
}

const CircleButtonManager: React.FunctionComponent<
	CircleButtonManagerProps
> = ({ onClick, exam }) => {
	const [didChange, setDidChange] = useState(1);

	return (
		<div>
			{exam?.questions.map((q, index) => (
				<CircleButton
					onClick={() => {
						onClick(q);
						exam.currentQuestionID = q.id;
						setDidChange(didChange + 1);
					}}
					text={(index + 1).toString()}
					isActive={
						didChange >= 1 && exam?.currentQuestionID === q.id
					}
					key={index}
				/>
			))}
		</div>
	);
};

export default CircleButtonManager;
