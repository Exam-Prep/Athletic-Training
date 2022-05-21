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

	// set the drag and drop objects when a match question is opened, or an attempted asnwer is changed
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

	// if a value was dropped, update the objects
	const didDropValue = (item: string, dropBoxID: string) => {
		setAnswerMap((existingAnswerMap) => {
			existingAnswerMap.set(dropBoxID, item);
			forceUpdate();
			return existingAnswerMap;
		});
	};

	// get the value dropped in the drop box
	const getDroppedValue = (dropBoxID: string) => {
		return answerMap.get(dropBoxID) ?? "";
	};

	return (
		<DndProvider backend={HTML5Backend}>
			{matchQuestion.imageURL !== "" ? (
				<img className={styles.image} src={matchQuestion.imageURL} />
			) : (
				""
			)}
			<div className={styles.dragnDropRow}>
				<div className={styles.dragnDrop}>
					{/* map all drag objects */}
					{dragNames?.map((x) => {
						return <DragBox name={x} key={x} />;
					})}
				</div>
				<div className={styles.dragnDrop}>
					{/* map all drop objects */}
					{dropNames?.map((x) => (
						<DropBox
							name={x}
							key={x}
							didDrop={didDropValue}
							droppedValue={getDroppedValue(x)}
						/>
					))}
				</div>
			</div>
			{checkAnswer()}
		</DndProvider>
	);
};

export default DisplayMatchQuestion;
