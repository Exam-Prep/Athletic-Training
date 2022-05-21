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
				isActive ? styles.circle_button_active : styles.circle_button // sets the color of the button based on whether or not we are on this question
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
