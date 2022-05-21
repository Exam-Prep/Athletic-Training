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
	droppedValue: string;
}

interface ItemType {
	name: string;
}

const DropBox: React.FC<DropBoxProps> = ({ name, didDrop, droppedValue }) => {
	// set the dropped name if there is one
	const [droppedName, setDroppedName] = useState(droppedValue);
	// eslint-disable-next-line no-empty-pattern
	const [{}, drop] = useDrop(() => ({
		accept: ItemTypes.BOX,
		// grab the items that are dropped to this object
		collect: (monitor) => ({
			isActive: monitor.canDrop() && monitor.isOver(),
			id: monitor.getItem(),
		}),
		// set the item to display the dropped name within this content
		drop: (item: ItemType) => {
			setDroppedName(item.name as string);
			didDrop(item.name, name);
		},
	}));

	return (
		<div ref={drop} className={styles.dropBox}>
			{name}
			{":" + "\n" + droppedName}
		</div>
	);
};

export default DropBox;
