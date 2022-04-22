/** @format */

import { useDrop } from "react-dnd";
import React from "react";
import styles from "./styles.scss";

export const ItemTypes = {
	BOX: "box",
};

const DropBox = () => {
	const [{ isActive }, drop] = useDrop(() => ({
		accept: ItemTypes.BOX,
		collect: (monitor) => ({
			isActive: monitor.canDrop() && monitor.isOver(),
		}),
	}));

	return (
		<div ref={drop} className={styles.dropBox}>
			{isActive ? "Release to drop" : "Drag item here"}
		</div>
	);
};

export default DropBox;
