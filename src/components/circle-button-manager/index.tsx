/** @format */
import React, { useState } from "react";
import CircleButton from "../circle-button";
import { Exam } from "../../model/Exam";
import { Question } from "../../model/Question";

interface CircleButtonManagerProps {
	onClick: (question: Question, index: number) => void;
	exam: Exam | undefined;
	currentIndex: number;
}

const CircleButtonManager: React.FunctionComponent<
	CircleButtonManagerProps
> = ({ onClick, exam, currentIndex }) => {
	const [didChange, setDidChange] = useState(1);

	return (
		<div>
			{exam?.questions.map((q, index) => (
				<CircleButton
					onClick={() => {
						onClick(q, index);
						setDidChange(didChange + 1);
					}}
					text={(index + 1).toString()}
					isActive={didChange >= 1 && currentIndex === index}
					key={index}
				/>
			))}
		</div>
	);
};

export default CircleButtonManager;
