/** @format */

import React, { useRef, useState } from "react";
import HotSpotQuestion from "../../model/HotSpotQuestion";
import { AttemptedAnswer } from "../../model/User";
import styles from "./styles.scss";

interface DisplayHotSpotProps {
	question: HotSpotQuestion;
	answer: AttemptedAnswer | undefined;
	onClick: (question: HotSpotQuestion, x: number, y: number) => void;
}

const DisplayHotSpot: React.FunctionComponent<DisplayHotSpotProps> = ({
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

	const imageClicked = (e: any) => {
		const x =
			(e.nativeEvent.offsetX - HotSpotQuestion.offset) /
			imageRef.current!.offsetWidth;
		const y =
			(e.nativeEvent.offsetY - HotSpotQuestion.offset) /
			imageRef.current!.offsetWidth;
		setStyle({
			position: "absolute",
			left:
				"calc(" +
				((x * imageRef.current!.offsetWidth) /
					imageRef.current!.offsetWidth) *
					100 +
				"%)",
			top:
				"calc(" +
				((y * imageRef.current!.offsetHeight) /
					imageRef.current!.offsetHeight) *
					100 +
				"%)",
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
					(answer?.x / imageRef.current!.offsetWidth) * 100 +
					"%)",
				top:
					"calc(" +
					(answer?.y / imageRef.current!.offsetHeight) * 100 +
					"%)",
				width: HotSpotQuestion.width,
				height: HotSpotQuestion.height,
				opacity: 0.5,
				borderRadius: "50%",
				background: "red",
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
		</div>
	);
};

export default DisplayHotSpot;
