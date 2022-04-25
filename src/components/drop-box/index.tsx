/** @format */

import { useDrop } from "react-dnd";
import React, { useState } from "react";
import styles from "./styles.scss";

export const ItemTypes = {
	BOX: "box",
};

const DropBox = () => {
	const [name, setName] = useState("");
 	const [{ isActive }, drop] = useDrop(() => ({
		accept: ItemTypes.BOX,
		collect: (monitor) => ({
			isActive: monitor.canDrop() && monitor.isOver(),
			id: monitor.getItem()
		}),
		drop: (item) => setName(item as string),
	}));

	return (
		<div ref={drop} className={styles.dropBox}>
			{isActive ? "Release to drop" : "Drag item here\n"}
			{name.name}
		</div>
	);
};

export default DropBox;
