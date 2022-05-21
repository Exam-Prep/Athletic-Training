/** @format */

import React, { useState, useRef } from "react";
import { Exam } from "../../model/Exam";
import styles from "./styles.scss";
import ImageUploader from "../image-upload";
import HotSpotQuestion from "../../model/HotSpotQuestion";
import $ from "jquery";

interface CreateHotSpotProps {
	exam: Exam;
}

const CreateHotSpot: React.FunctionComponent<CreateHotSpotProps> = ({
	exam,
}) => {
	const [imageURL, setImageURL] = useState("");
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [question, setQuestion] = useState("");
	const [image, setImage] = useState(false);
	const showModal = () => setImage(true);
	const closeModal = () => setImage(false);
	const updateSetImageURL = (url: string): void => {
		setImageURL(url);
	};
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
	// default target position is in the top left
	const [style, setStyle] = useState<React.CSSProperties>({
		position: "absolute",
		left: 10,
		top: 10,
		width: HotSpotQuestion.width,
		height: HotSpotQuestion.height,
		opacity: 0.5,
		borderRadius: "50%",
		background: "red",
	});
	const imageClicked = (e: any) => {
		const percentageX =
			(e.nativeEvent.offsetX - HotSpotQuestion.offset) /
			imageRef.current!.offsetWidth; // save x as a percentage to keep the correct spot on different screens
		const percentageY =
			(e.nativeEvent.offsetY - HotSpotQuestion.offset) /
			imageRef.current!.offsetHeight; // save y as a percentage to keep the correct spot on different screens
		console.log(percentageX, percentageY);
		setX(percentageX);
		setY(percentageY);
		// move the target to the place where the user clicked
		setStyle({
			position: "absolute",
			left: e.nativeEvent.offsetX - HotSpotQuestion.offset,
			top: e.nativeEvent.offsetY - HotSpotQuestion.offset,
			width: HotSpotQuestion.width,
			height: HotSpotQuestion.height,
			opacity: 0.5,
			borderRadius: "50%",
			background: "red",
		});
	};

	// display the image
	const renderImage = () => {
		if (imageURL !== "") {
			return (
				<img
					onClick={imageClicked}
					src={imageURL}
					style={{
						position: "relative",
						margin: 0,
						top: 0,
						left: 0,
						userSelect: "none",
						WebkitUserSelect: "none",
					}}
					ref={imageRef}
					className={"img-fluid"}
					draggable={false}
				></img>
			);
		} else {
			return "";
		}
	};

	// display the target
	const renderHotSpot = () => {
		if (imageURL === "") {
			return "";
		}
		return <div style={style}></div>;
	};

	// write the exam and reset input when the user adds their question
	const addQuestion = () => {
		const hotSpotQuestion = new HotSpotQuestion(
			question,
			null,
			x,
			y,
			imageURL,
		);
		exam.questions.push(hotSpotQuestion);
		exam.writeExam();
		setImageURL("");
		setQuestion("");
		setX(0);
		setY(0);
		$("textarea").filter("[id*=question-input]").val("");
	};

	return (
		<div>
			{/* input for a question's text */}
			<textarea
				className={styles.input}
				rows={3}
				placeholder='Question'
				id='question-input'
				onChange={(e) => {
					setQuestion(e.target.value);
				}}
			/>
			{/* display the image and the hot spot target */}
			<div className={styles.container}>
				{renderImage()}
				{renderHotSpot()}
				{imageURL === "" ? (
					<button
						className={styles.addQuestionButton}
						onClick={showModal}
					>
						Add Image
					</button>
				) : (
					""
				)}
				<button
					className={styles.addQuestionButton}
					onClick={addQuestion}
				>
					Add Question
				</button>
				{/* call the image uploader if the user needs to add an image */}
				<ImageUploader
					hide={image}
					examString={exam.name}
					updateImageURL={updateSetImageURL}
					closeModal={closeModal}
				/>
			</div>
		</div>
	);
};

export default CreateHotSpot;
