/** @format */

import React from "react";

import styles from "./styles.scss";

const LoginButton = () => {
	const onClick = () => {
		alert("I got clicked");
	};

	return (
		<button className={styles.loginButton} onClick={onClick}>
			Login
		</button>
	);
};

export default LoginButton;
