/** @format */

import React from "react";

import Page from "../page";

import styles from "./styles.scss";

import AuthWidget from "../../../auth-widget";

const Login = () => {
	return (
		<Page>
			<div className={styles.header}>
				<div className={styles.logo}>
					<div className={styles.athleti}>Athleti</div>
					<div className={styles.train}>Train</div>
					<div className={styles.whitworth}>
						by Whitworth University
					</div>
				</div>
				<div className={styles.headerBorder} />
			</div>
			<div className={styles.loginBackground}>
				<div className={styles.loginBox}>
					<AuthWidget />
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
