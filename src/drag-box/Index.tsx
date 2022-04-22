/** @format */

import React, { CSSProperties } from "react";
import styles from "./styles.scss";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../components/drop-box";

export interface SourceBoxProps {
	showCopyIcon?: boolean;
}

const DragBox: React.FC<SourceBoxProps> = ({ showCopyIcon }) => {
	const [{ opacity }, drag] = useDrag(
		() => ({
			type: ItemTypes.BOX,
			options: {
				dropEffect: "copy",
			},
			collect: (monitor) => ({
				opacity: monitor.isDragging() ? 0.4 : 1,
			}),
		}),
		[showCopyIcon],
	);

	return (
		<div ref={drag} style={{opacity }}>
			When I am over a drop zone, I have {showCopyIcon ? "copy" : "no"} icon.
		</div>
	);
};

export default DragBox;
