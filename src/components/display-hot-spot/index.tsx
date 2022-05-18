/** @format */

import React, { useRef, useState } from "react";
import HotSpotQuestion from "../../model/HotSpotQuestion";
import { AttemptedAnswer } from "../../model/User";
import styles from "./styles.scss";

interface DisplayHotSpot {
	question: HotSpotQuestion;
	answer: AttemptedAnswer | undefined;
	onClick: (question: HotSpotQuestion, x: number, y: number) => void;
}

const DisplayHotSpot: React.FunctionComponent<DisplayHotSpot> = ({
	question,
	answer,
	onClick,
}) => {
	const imageRef = useRef<HTMLImageElement | null>(null);

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

	const [styleCorrect, setCorrectStyle] = useState<React.CSSProperties>({
		position: "absolute",
		left: 0,
		top: 0,
		width: HotSpotQuestion.width,
		height: HotSpotQuestion.height,
		opacity: 0.5,
		borderRadius: "50%",
		background: "red",
	});

	const imageClicked = (e: any) => {
		const x = e.nativeEvent.offsetX - HotSpotQuestion.offset;
		const y = e.nativeEvent.offsetY - HotSpotQuestion.offset;
		setStyle({
			position: "absolute",
			left: "calc(" + (x / imageRef.current!.clientWidth) * 100 + "%)",
			top: "calc(" + (y / imageRef.current!.clientHeight) * 100 + "%)",
			width: HotSpotQuestion.width,
			height: HotSpotQuestion.height,
			opacity: 0.5,
			borderRadius: "50%",
			background: "red",
		});
		onClick(question, x, y);
	};

	const renderRedDotIfNecessary = () => {
		if (answer?.x && answer?.y) {
			setStyle({
				position: "absolute",
				left:
					"calc(" +
					(answer?.x / imageRef.current!.clientWidth) * 100 +
					"%)",
				top:
					"calc(" +
					(answer?.y / imageRef.current!.clientHeight) * 100 +
					"%)",
				width: HotSpotQuestion.width,
				height: HotSpotQuestion.height,
				opacity: 0.5,
				borderRadius: "50%",
				background: "red",
			});
			setCorrectStyle({
				position: "absolute",
				left:
					"calc(" +
					(question.x / imageRef.current!.clientWidth) * 100 +
					"%)",
				top:
					"calc(" +
					(question.y / imageRef.current!.clientHeight) * 100 +
					"%)",
				width: HotSpotQuestion.width,
				height: HotSpotQuestion.height,
				opacity: 0.5,
				borderRadius: "50%",
				background: "green",
			});
		}
	};

	return (
		<div className={styles.container}>
			<img
				onClick={imageClicked}
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
			<div style={style}></div>
			<div style={styleCorrect}></div>
		</div>
	);
};

export default DisplayHotSpot;
