/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { DndProvider } from "react-dnd";
import DropBox from "../drop-box";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Exam } from "../../model/Exam";
import DragBox from "../drag-box/Index";
import MatchQuestion from "../../model/MatchQuestion";
import $ from "jquery";
import { Toast, ToastContainer } from "react-bootstrap";

interface DragUIContainerProps {
	exam: Exam;
}

function clearInput() {
	$("textarea").filter("[id*=question-input]").val("");
	$("input").filter("[id*=key-input]").val("");
	$("input").filter("[id*=value-input]").val("");
}

function readyForRender(dropNames: string[], answerMap: Map<string, string>) {
	const keys = Array.from(answerMap.keys());
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
	const [show, setShow] = useState(false);

	const showToast = () => setShow(true);

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
		showToast();
		clearInput();
	};

	const didDropValue = (item: string, dropBoxID: string) => {
		setAnswerMap((existingAnswerMap) => {
			existingAnswerMap.set(dropBoxID, item);
			forceUpdate();
			return existingAnswerMap;
		});
	};

	return (
		<DndProvider backend={HTML5Backend}>
			<ToastContainer position='top-center'>
				<Toast
					onClose={() => setShow(false)}
					show={show}
					delay={3000}
					autohide
				>
					<Toast.Body>Question Added!</Toast.Body>
				</Toast>
			</ToastContainer>
			<div className={styles.dragnDropInput}>
				<textarea
					className={styles.input}
					rows={3}
					placeholder='Question'
					id='question-input'
					onChange={(e) => {
						setQuestion(e.target.value);
					}}
				/>
				<div className={styles.dragnDropRow}>
					<input
						className={styles.keyValueInput}
						placeholder='Key'
						id='key-input'
						onChange={(e) => {
							setCurrentDragName(e.target.value);
						}}
					/>
					<button
						className={styles.addDraggableButton}
						onClick={addDrag}
					>
						Add Key
					</button>
				</div>
				<div className={styles.dragnDropRow}>
					<input
						className={styles.keyValueInput}
						placeholder='Value'
						id='value-input'
						onChange={(e) => {
							setCurrentDropName(e.target.value);
						}}
					/>
					<button
						className={styles.addDraggableButton}
						onClick={addDrop}
					>
						Add Value
					</button>
				</div>

				<p className={styles.instruction}>
					Drag the option on the left onto the corresponding option on
					the right to link them together:
				</p>
				<div className={styles.dragnDropRow}>
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
				</div>
				<button
					className={
						readyForRender(dropNames, answerMap)
							? styles.addQuestion
							: styles.hidden
					}
					onClick={reconcileData}
				>
					Add Question
				</button>
			</div>
		</DndProvider>
	);
};

export default DragUIContainer;
