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
	const [question, setQuestion] = useState("");
	const [image, setImage] = useState(false);
	const showModal = () => setImage(true);
	const closeModal = () => setImage(false);
	const updateSetImageURL = (url: string): void => {
		setImageURL(url);
	};
	const imageRef = useRef<HTMLImageElement | null>(null);
	const [x, setX] = useState(0);
	const [y, setY] = useState(0);
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
		setX(e.nativeEvent.offsetX - HotSpotQuestion.offset);
		setY(e.nativeEvent.offsetY - HotSpotQuestion.offset);
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

	const renderHotSpot = () => {
		if (imageURL === "") {
			return "";
		}
		return <div style={style}></div>;
	};

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
			<textarea
				className={styles.input}
				rows={3}
				placeholder='Question'
				id='question-input'
				onChange={(e) => {
					setQuestion(e.target.value);
				}}
			/>
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
