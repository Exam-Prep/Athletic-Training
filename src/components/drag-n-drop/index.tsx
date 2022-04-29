/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { DndProvider } from "react-dnd";
import DropBox from "../drop-box";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Exam } from "../../model/Exam";
import DragBox from "../drag-box/Index";
import MatchQuestion from "../../model/MatchQuestion";

interface DragUIContainerProps {
	exam: Exam;
}

function readyForRender(dropNames: string[], answerMap: Map<string, string>) {
	const keys = Array.from(answerMap.keys())
	const ready = dropNames.filter((value) => {
		return keys.includes(value);
	});
	return ready.length == dropNames.length && ready.length != 0;
}

const DragUIContainer: React.FC<DragUIContainerProps> = ({ exam }) => {
	const [dragNames, setDragNames] = useState<Array<string>>([]);
	const [dropNames, setDropNames] = useState<Array<string>>([]);
	const [question, setQuestion] = useState("");
	const [currentDragName, setCurrentDragName] = useState("");
	const [currentDropName, setCurrentDropName] = useState("");
	const [answerMap, setAnswerMap] = useState<Map<string, string>>(
		new Map<string, string>(),
	);
	const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;

	const addDrag = () => {
		if (!dragNames.includes(currentDragName)) {
			setDragNames([...dragNames, currentDragName]);
		}
	};

	const addDrop = () => {
		if (!dropNames.includes(currentDropName)) {
			setDropNames([...dropNames, currentDropName]);
		}
	};

	const reconcileData = () => {
		const matchQuestion = new MatchQuestion(question, answerMap, null);
		exam.questions.push(matchQuestion);
		exam.writeExam();
	};

	const didDropValue = (item: string, dropBoxID: string) => {
		console.log("HELLO");
		setAnswerMap((existingAnswerMap) => {
			console.log("HELLO");
			existingAnswerMap.set(dropBoxID, item);
			forceUpdate();
			return existingAnswerMap;
		});
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<div className={styles.dragnDropInput}>
				<textarea
					className={styles.input}
					rows={3}
					onChange={(e) => {
						setQuestion(e.target.value);
					}}
				/>
				Add Key
				<input
					className={styles.input}
					onChange={(e) => {
						setCurrentDragName(e.target.value);
					}}
				/>
				<button className={styles.addDraggableBox} onClick={addDrag}>
					Add Key
				</button>
				Add Value
				<input
					className={styles.input}
					onChange={(e) => {
						setCurrentDropName(e.target.value);
					}}
				/>
				<button className={styles.addDraggableBox} onClick={addDrop}>
					Add Value
				</button>
				<div className={styles.break}></div>
				<div className={styles.dragnDrop}>
					{dragNames?.map((x) => {
						return <DragBox name={x} key={x} />;
					})}
				</div>
				<div className={styles.dragnDrop}>
					{dropNames?.map((x) => (
						<DropBox name={x} key={x} didDrop={didDropValue} />
					))}
				</div>
				{readyForRender(dropNames, answerMap) ? (
					<button
						className={styles.addDraggableBox}
						onClick={reconcileData}
					>
						Add Question
					</button>
				) : (
					""
				)}
			</div>
		</DndProvider>
	);
};

export default DragUIContainer;
