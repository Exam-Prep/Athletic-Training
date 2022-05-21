/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

// display the correct error code if login was failed
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
	const path = "/exams";
	const navigate = useNavigate();

	// when a user tries to login
	const onClickLogin = () => {
		if (login) {
			// login and navigate on success
			login(email, password)
				.then(() => {
					navigate(path);
				})
				// display a helpful error message on failure
				.catch((error) => {
					setError(readableErrorCode(error.code));
				});
		}
	};

	// when a user tries to register
	const onClickRegister = () => {
		if (register) {
			// register and login on success
			register(email, password)
				.then(() => {
					navigate(path);
				})
				// display a helpful error message on failure
				.catch((error) => {
					setError(readableErrorCode(error.code));
				});
		}
	};

	// stop displaying an error when the user dismisses it
	const onClickExitErrorBanner = () => {
		setError("");
	};

	return (
		<div className={styles.authWidget}>
			{/* display errors when necessary */}
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
			{/* input for a user's email */}
			<input
				type='email'
				className={styles.input}
				onChange={(e) => setEmail(e.target.value)}
				placeholder='Username (typically your email)'
			/>
			{/* input for a user's password */}
			<input
				type='password'
				className={styles.input}
				onChange={(e) => setPassword(e.target.value)}
				placeholder='Password'
			/>
			{/* display login and register buttons beneath inputs */}
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
				{/* future: implement forgot password button */}
				{/* <button className={styles.forgotPassword}>
					Forgot Password?
				</button> */}
			</div>
		</div>
	);
};

export default AuthWidget;
