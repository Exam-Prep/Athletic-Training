/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { useAuth } from "../../AuthContext";

function readableErrorCode(code: string): string {
	switch (code) {
		case "auth/invalid-email":
			return "Invalid email. Please input a valid email";
		case "auth/user-not-found":
			return "Unregistered User. Please register";
		case "auth/wrong-password":
			return "Incorrect Password. Please try again";
		default:
			return "Login or Register Failed. Please try again";
	}
}

const AuthWidget = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login, register } = useAuth();

	const onClickLogin = () => {
		if (login) {
			login(email, password)
				.then((user) => {
					console.log(user.user);
				})
				.catch((error) => {
					setError(readableErrorCode(error.code));
				});
		}
	};

	const onClickRegister = () => {
		if (register) {
			register(email, password)
				.then((user) => {
					console.log(user.user);
				})
				.catch((error) => {
					setError(readableErrorCode(error.code));
				});
		}
	};

	const onClickExitErrorBanner = () => {
		setError("");
	};

	return (
		<div className={styles.authWidget}>
			<div className={styles.errorHandling}>
				{error && <h3 className={styles.errorText}> {error}</h3>}
				{error && (
					<button
						className={styles.exitButton}
						onClick={onClickExitErrorBanner}
					>
						X
					</button>
				)}
			</div>
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
