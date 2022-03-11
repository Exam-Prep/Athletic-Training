/** @format */

import React from "react";

import Page from "../page";

import styles from "./styles.scss";

import LoginButton from "../../../login-button";

const Login = () => {
	return (
		<Page>
			<div className={styles.background}>
				<div className={styles.logo}>
					<div className={styles.athleti}>Athleti</div>
					<div className={styles.train}>Train</div>
					<div className={styles.whitworth}>
						by Whitworth University
					</div>
				</div>
				<div className={styles.headerBorder} />
				<div className={styles.loginBox}>
					<input
						className={styles.usernameTextBox}
						placeholder='Username (typically your email)'
					></input>
					<input
						className={styles.passwordTextBox}
						placeholder='Password'
					></input>
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
