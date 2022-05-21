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
			// show an opaque box when dragging
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.4 : 1,
			}),
			// display the name of the drag object
			item: { name: name },
		}),
		[],
	);

	return (
		// display the dragable object
		<div ref={drag} className={styles.dragBox} style={{ opacity }}>
			{name}
		</div>
	);
};

export default DragBox;
