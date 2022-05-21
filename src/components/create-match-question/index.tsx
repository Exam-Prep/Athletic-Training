/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { DndProvider } from "react-dnd";
import DropBox from "../drop-box";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Exam } from "../../model/Exam";
import DragBox from "../drag-box/Index";
import MatchQuestion from "../../model/MatchQuestion";
import { didFinishQuestion } from "../../misc/didFinishQuestion";
import $ from "jquery";
import { Toast, ToastContainer } from "react-bootstrap";
import ImageUploader from "../image-upload";

interface CreateMatchQuestionProps {
	exam: Exam;
}

// clear text areas for another question to be added
function clearInput() {
	$("textarea").filter("[id*=question-input]").val("");
	$("input").filter("[id*=key-input]").val("");
	$("input").filter("[id*=value-input]").val("");
}

const CreateMatchQuestion: React.FC<CreateMatchQuestionProps> = ({ exam }) => {
	// arrays of drag and drop objects
	const [dragNames, setDragNames] = useState<Array<string>>([]);
	const [dropNames, setDropNames] = useState<Array<string>>([]);
	const [question, setQuestion] = useState("");
	const [currentDragName, setCurrentDragName] = useState("");
	const [currentDropName, setCurrentDropName] = useState("");
	const [answerMap, setAnswerMap] = useState<Map<string, string>>(
		new Map<string, string>(),
	);
	const [imageURL, setImageURL] = useState<string>("");

	const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void;
	const [show, setShow] = useState(false);

	const showToast = () => setShow(true);

	const [image, setImage] = useState(false);
	const showModal = () => setImage(true);
	const closeModal = () => setImage(false);

	const updateSetImageURL = (url: string): void => {
		setImageURL(url);
	};

	// add a new drag to the array
	const addDrag = () => {
		if (!dragNames.includes(currentDragName)) {
			setDragNames([...dragNames, currentDragName]);
		}
	};

	// add a new drop to the array
	const addDrop = () => {
		if (!dropNames.includes(currentDropName)) {
			setDropNames([...dropNames, currentDropName]);
		}
	};

	// write the question to the database and clear text fields
	const reconcileData = () => {
		const matchQuestion = new MatchQuestion(
			question,
			answerMap,
			null,
			imageURL,
		);
		exam.questions.push(matchQuestion);
		exam.writeExam();
		showToast();
		clearInput();
	};

	// update the database to show that a drag was mapped to a drop
	const didDropValue = (item: string, dropBoxID: string) => {
		setAnswerMap((existingAnswerMap) => {
			existingAnswerMap.set(dropBoxID, item);
			forceUpdate();
			return existingAnswerMap;
		});
	};

	return (
		<DndProvider backend={HTML5Backend}>
			{/* toast to tell the user if they were successful */}
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
				{/* question input */}
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
					{/* drag input */}
					<input
						className={styles.keyValueInput}
						placeholder='Drag Object'
						id='key-input'
						onChange={(e) => {
							setCurrentDragName(e.target.value);
						}}
					/>
					<button
						className={styles.addDraggableButton}
						onClick={addDrag}
					>
						Add Drag Object
					</button>
				</div>
				<div className={styles.dragnDropRow}>
					{/* drop input */}
					<input
						className={styles.keyValueInput}
						placeholder='Drop Object'
						id='value-input'
						onChange={(e) => {
							setCurrentDropName(e.target.value);
						}}
					/>
					<button
						className={styles.addDraggableButton}
						onClick={addDrop}
					>
						Add Drop Object
					</button>
				</div>
				{/* instructions to help the user figure out how to map drag and drop together */}
				<p className={styles.instruction}>
					Drag the option on the left onto the corresponding option on
					the right to link them together:
				</p>
				<div className={styles.dragnDropRow}>
					<div className={styles.dragnDrop}>
						{/* display all drag boxes */}
						{dragNames?.map((x) => {
							return <DragBox name={x} key={x} />;
						})}
					</div>
					<div className={styles.dragnDrop}>
						{/* display all drop boxes */}
						{dropNames?.map((x) => (
							<DropBox
								name={x}
								key={x}
								didDrop={didDropValue}
								droppedValue={""}
							/>
						))}
					</div>
				</div>
				{exam !== undefined ? (
					// image uploader to let users add an image to their question
					<ImageUploader
						hide={image}
						examString={exam.name}
						updateImageURL={updateSetImageURL}
						closeModal={closeModal}
					/>
				) : (
					""
				)}
				<button className={styles.addQuestion} onClick={showModal}>
					Add Image
				</button>
				<button
					// only display the add question button if all drop objects are mapped to a drag object
					className={
						didFinishQuestion(dropNames, answerMap)
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

export default CreateMatchQuestion;
