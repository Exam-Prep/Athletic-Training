/** @format */

import { useDrop } from "react-dnd";
import React, { useState } from "react";
import styles from "./styles.scss";

export const ItemTypes = {
	BOX: "box",
};

interface DropBoxProps {
	name: string;
	didDrop: (item: string, dropBoxID: string) => void;
}

interface ItemType {
	name: string;
}

const DropBox: React.FC<DropBoxProps> = ({ name, didDrop }) => {
	const [droppedName, setDroppedName] = useState("");
	const [{}, drop] = useDrop(() => ({
		accept: ItemTypes.BOX,
		collect: (monitor) => ({
			isActive: monitor.canDrop() && monitor.isOver(),
			id: monitor.getItem(),
		}),
		drop: (item: ItemType) => {
			setDroppedName(item.name as string);
			didDrop(item.name, name);
		},
	}));

	return (
		<div ref={drop} className={styles.dropBox}>
			{droppedName + "\n"}
			{name}
		</div>
	);
};

export default DropBox;
