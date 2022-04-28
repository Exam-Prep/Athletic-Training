/** @format */

import React from "react";
import styles from "./styles.scss";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../drop-box";

export interface SourceBoxProps {
	name: string;
}

const DragBox: React.FC<SourceBoxProps> = ({ name }) => {
	const [{ opacity }, drag] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			options: {
				dropEffect: "copy",
			},
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.4 : 1,
			}),
			item: { name: name },
		}),
		[],
	);

	return (
		<div ref={drag} className={styles.dragBox} style={{ opacity }}>
			{name}
		</div>
	);
};

export default DragBox;
