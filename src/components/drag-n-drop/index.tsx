import React from "react";
import { DndProvider } from "react-dnd";
import DragBox from "../../drag-box/Index";
import DropBox from "../drop-box";
import { HTML5Backend } from 'react-dnd-html5-backend'

const DragUIContainer = () => {
	return (
			<DndProvider backend={HTML5Backend}>
				<DragBox />
				<DropBox />
			</DndProvider>
	)
};

export default DragUIContainer;