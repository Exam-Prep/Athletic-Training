/** @format */
import React, { useEffect, useState } from "react";
import styles from "./styles.scss";
import { DndProvider } from "react-dnd";
import DropBox from "../drop-box";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragBox from "../drag-box/Index";
import MatchQuestion from "../../model/MatchQuestion";
import { didFinishQuestion } from "../../misc/didFinishQuestion";
import { AttemptedAnswer } from "../../model/User";

interface DisplayMatchQuestionProps {
	didAnswer: (
		answerMap: Map<string, string>,
		matchQuestion: MatchQuestion,
	) => void;
	attemptedAnswer: AttemptedAnswer | undefined;
	matchQuestion: MatchQuestion;
}

const DisplayMatchQuestion: React.FC<DisplayMatchQuestionProps> = ({
	didAnswer,
	attemptedAnswer,
	matchQuestion,
}) => {
	const [dragNames, setDragNames] = useState<Array<string>>([]);
	const [dropNames, setDropNames] = useState<Array<string>>([]);
	const [answerMap, setAnswerMap] = useState<Map<string, string>>(
		new Map<string, string>(),
	);
	const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

	useEffect(() => {
		setDragNames(Array.from(matchQuestion.answerMap.values()));
		setDropNames(Array.from(matchQuestion.answerMap.keys()));
		if (attemptedAnswer?.answerMap != undefined) {
			setAnswerMap(attemptedAnswer.answerMap);
		}
	}, [matchQuestion, attemptedAnswer]);

	const checkAnswer = () => {
		if (didFinishQuestion(dropNames, answerMap)) {
			didAnswer(answerMap, matchQuestion);
		}
	};

	const didDropValue = (item: string, dropBoxID: string) => {
		setAnswerMap((existingAnswerMap) => {
			existingAnswerMap.set(dropBoxID, item);
			forceUpdate();
			return existingAnswerMap;
		});
	};

	const getDroppedValue = (dropBoxID: string) => {
		return answerMap.get(dropBoxID) ?? "";
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.dragnDrop}>
				{dragNames?.map((x) => {
					return <DragBox name={x} key={x} />;
				})}
			</div>
			<div className={styles.dragnDrop}>
				{dropNames?.map((x) => (
					<DropBox
						name={x}
						key={x}
						didDrop={didDropValue}
						droppedValue={getDroppedValue(x)}
					/>
				))}
			</div>
			{checkAnswer()}
		</DndProvider>
	);
};

export default DisplayMatchQuestion;
