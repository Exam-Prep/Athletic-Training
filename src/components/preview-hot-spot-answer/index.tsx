/** @format */

import React, { useRef, useState } from "react";
import HotSpotQuestion from "../../model/HotSpotQuestion";
import { AttemptedAnswer } from "../../model/User";
import styles from "./styles.scss";

interface PreviewHotSpotAnswerProps {
	question: HotSpotQuestion;
	answer: AttemptedAnswer | undefined;
	parentWidth: number;
}

// display answer that user gave for hotspot question and correct answer
const PreviewHotSpotAnswer: React.FunctionComponent<
	PreviewHotSpotAnswerProps
> = ({ question, answer, parentWidth }) => {
	// set initial state with refs after first render
	const imageRef = useRef<HTMLImageElement | null>(null);
	const divRef = useRef<HTMLDivElement | null>(null);
	const [style, setStyle] = useState<React.CSSProperties>({
		position: "absolute",
		left: 0,
		top: 0,
		width: HotSpotQuestion.width,
		height: HotSpotQuestion.height,
		opacity: 0.5,
		borderRadius: "50%",
		background: "red",
	});

	// set style for correct (green) circle
	const [styleCorrect, setCorrectStyle] = useState<React.CSSProperties>({
		position: "absolute",
		left: 0,
		top: 0,
		width: HotSpotQuestion.width,
		height: HotSpotQuestion.height,
		opacity: 0.5,
		borderRadius: "50%",
		background: "green",
	});

	// render user's answer dot
	const renderRedDotIfNecessary = () => {
		let scaleX = 100;
		let scaleY = 100;
		if (imageRef.current!.offsetWidth / parentWidth >= 1) {
			scaleX = 80;
			scaleY = 80;
		}

		// do math to display dots in correct location no matter screen size
		if (answer?.x && answer?.y) {
			setStyle({
				position: "absolute",
				left:
					"calc(" +
					((answer.x * imageRef.current!.offsetWidth) /
						imageRef.current!.offsetWidth) *
						scaleX +
					"%)",
				top:
					"calc(" +
					((answer.y * imageRef.current!.offsetHeight) /
						imageRef.current!.offsetHeight) *
						scaleY +
					"%)",
				width: HotSpotQuestion.width,
				height: HotSpotQuestion.height,
				opacity: 0.5,
				borderRadius: "50%",
				background: "red",
			});
		}
		setCorrectStyle({
			position: "absolute",
			left:
				"calc(" +
				((question.x * imageRef.current!.offsetWidth) /
					imageRef.current!.offsetWidth) *
					scaleX +
				"%)",
			top:
				"calc(" +
				((question.y * imageRef.current!.offsetHeight) /
					imageRef.current!.offsetHeight) *
					scaleY +
				"%)",
			width: HotSpotQuestion.width,
			height: HotSpotQuestion.height,
			opacity: 0.5,
			borderRadius: "50%",
			background: "green",
		});
	};

	// load image and put dots on if answered by user
	return (
		<div className={styles.container}>
			<img
				src={question.imageURL}
				ref={imageRef}
				style={{
					position: "relative",
					margin: 0,
					top: 0,
					left: 0,
					userSelect: "none",
					WebkitUserSelect: "none",
				}}
				onLoad={renderRedDotIfNecessary}
				className={"img-fluid"}
				draggable={false}
			></img>
			{answer !== undefined ? <div style={style}></div> : ""}
			<div ref={divRef} style={styleCorrect}></div>
		</div>
	);
};

export default PreviewHotSpotAnswer;
