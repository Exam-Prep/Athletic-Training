/** @format */

import React from "react";
import styles from "./styles.scss";

interface CircleButtonProps {
	onClick: () => void;
	text: string;
	isActive: boolean;
}

const CircleButton: React.FunctionComponent<CircleButtonProps> = ({
	onClick,
	text,
	isActive,
}) => {
	return (
		<button
			className={
				isActive ? styles.circle_button_active : styles.circle_button
			}
			onClick={() => {
				onClick();
			}}
		>
			{text}
		</button>
	);
};

export default CircleButton;
