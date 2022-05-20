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
		left: 0,
		top: 0,
		width: HotSpotQuestion.width,
		height: HotSpotQuestion.height,
	});

	const getOffsetWidth = (x: any): string =>
		x.nativeEvent.offsetX - HotSpotQuestion.offset;

	const getOffsetHeight = (x: any): string =>
		x.nativeEvent.offsetY - HotSpotQuestion.offset;

	const imageClicked = (e: any) => {
		const x =
			(e.nativeEvent.offsetX - HotSpotQuestion.offset) /
			imageRef.current!.offsetWidth;
		const y =
			(e.nativeEvent.offsetY - HotSpotQuestion.offset) /
			imageRef.current!.offsetHeight;
		setStyle((prevStyle) => ({
			...prevStyle,
			left: getOffsetWidth(e),
			top: getOffsetHeight(e),
		}));
		onClick(question, x, y);
	};

	const renderRedDotIfNecessary = () => {
		if (answer?.x && answer?.y) {
			setStyle((prevStyle) => ({
				...prevStyle,
				// left: getOffsetWidth(answer.x),
				// top: getOffsetHeight(answer.y),
				left:
					"calc(" +
					((answer.x * imageRef.current!.offsetWidth) /
						imageRef.current!.offsetWidth) *
						100 +
					"%)",
				top:
					"calc(" +
					((answer.y * imageRef.current!.offsetHeight) /
						imageRef.current!.offsetHeight) *
						100 +
					"%)",
			}));
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
			<div className={styles.hotspotDot} style={style}></div>
		</div>
	);
};

export default DisplayHotSpot;
