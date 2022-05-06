/** @format */

import React from "react";
import styles from "./styles.scss";

interface ArrowButtonProps {
	onClick: () => void;
	rotate: boolean;
	text: string;
}

const ArrowButton: React.FunctionComponent<ArrowButtonProps> = ({
	onClick,
	rotate,
	text,
}) => {
	return (
		<button
			className={`${styles.transparent} ${
				rotate ? styles.leftArrow : null
			}`}
			onClick={onClick}
		>
			<svg
				style={{ verticalAlign: "unset" }}
				xmlns='http://www.w3.org/2000/svg'
				width='80'
				height='80'
				viewBox='0 0 600 600'
				xmlSpace='preserve'
			>
				<path
					fill='#0158ae'
					vectorEffect='non-scaling-stroke'
					transform='matrix(6.26 0 0 6.26 75.02 65.64)'
					d='M41.17 72.5 80 40 41.17 7.5v20.605H0v23.847h41.17V72.5z'
				/>
			</svg>
			<span className={styles.text}>{text}</span>
		</button>
	);
};

export default ArrowButton;
