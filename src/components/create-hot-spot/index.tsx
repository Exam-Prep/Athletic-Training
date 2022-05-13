/** @format */

import React, { useRef, useState } from "react";
import { Exam } from "../../model/Exam";
import styles from "./styles.scss";
import { DndProvider } from "react-dnd";
import DropBox from "../drop-box";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragBox from "../drag-box/Index";

interface CreateHotSpotProps {
	exam: Exam;
}

const CreateHotSpot: React.FunctionComponent<CreateHotSpotProps> = ({
	exam,
}) => {
	const [style, setStyle] = useState({
		position: "absolute",
		left: 10,
		top: 10,
		width: 10,
		height: 10,
		background: "red",
	});
	const imageClicked = (e: any) => {
		setStyle({
			position: "absolute",
			left: e.nativeEvent.offsetX,
			top: e.nativeEvent.offsetY,
			width: 10,
			height: 10,
			background: "red",
		});
	};

	return (
		<div className={styles.container}>
			<img
				onClick={imageClicked}
				src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
				style={{
					position: "relative",
					margin: 0,
					top: 0,
					left: 0,
					height: "auto",
					userSelect: "none",
					WebkitUserSelect: "none",
					width: "auto",
				}}
				draggable={false}
			></img>
			<div style={style}></div>
		</div>
	);
};

export default CreateHotSpot;
