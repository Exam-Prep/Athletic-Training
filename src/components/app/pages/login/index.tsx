/** @format */

import React from "react";

import Page from "../page";

import styles from "./styles.scss";

import LoginButton from "../../../login-button";

const Login = () => {
	return (
		<Page>
			<div className={styles.background}>
				<div className={styles.headerBorder}>
					<div className={styles.logo}>
						AthletiTrain by Whitworth University
					</div>
				</div>
				<div className={styles.loginBox}>
					<input className={styles.usernameTextBox}></input>
					<input className={styles.passwordTextBox}></input>
					<LoginButton />
					<button className={styles.forgotPassword}>
						Forgot Password?
					</button>
					<button className={styles.createAccount}>
						New Learner? Click Here
					</button>
				</div>
			</div>
		</Page>
	);
};

export default Login;
