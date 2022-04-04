/** @format */

import React from "react";

import Page from "../page";

import styles from "./styles.scss";

import AuthWidget from "../../../auth-widget";

import ArrowButton from "../../../arrow-button";

const Login = () => {
	return (
		<Page>
			<ArrowButton
				onClick={() => alert("clicked")}
				rotate={true}
				text={"Next"}
			/>
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
				</div>
			</div>
		</Page>
	);
};

export default Login;
