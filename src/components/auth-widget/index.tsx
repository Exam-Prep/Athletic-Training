/** @format */

import React from "react";
import { useState } from "react";
import styles from "./styles.scss";
import { useAuth } from "../../AuthContext";

const AuthWidget = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, register } = useAuth();
	const onClickLogin = () => {
		if (login) {
			login(email, password)
				.then((user) => {
					console.log(user.user);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const onClickRegister = () => {
		console.log("User is %s and password is %s", email, password);
		if (register) {
			register(email, password)
				.then((user) => {
					console.log(user.user);
				})
				.catch((error) => {
					console.log(error.FirebaseError);
				});
		}
	};

	return (
		<div className={styles.authWidget}>
			<input
				type='email'
				className={styles.input}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='Username (typically your email)'
			/>
			<input
				type='password'
				className={styles.input}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			<div className={styles.buttonBox}>
				<button className={styles.loginButton} onClick={onClickLogin}>
					Login
				</button>
				<button
					className={styles.registerButton}
					onClick={onClickRegister}
				>
					Register
				</button>
				<button className={styles.forgotPassword}>
					Forgot Password?
				</button>
			</div>
		</div>
	);
};

export default AuthWidget;
