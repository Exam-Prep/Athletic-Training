/** @format */

import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

import {
	User,
	UserCredential,
	confirmPasswordReset,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

interface IAuthContext {
	currentUser: User | null;
	signInWithEmailAndPassword: typeof signInWithEmailAndPassword | null;
	login:
		| ((email: string, password: string) => Promise<UserCredential>)
		| null;
	register:
		| ((email: string, password: string) => Promise<UserCredential>)
		| null;
	logout: typeof signOut | null;
	forgotPassword: ((email: string) => Promise<void>) | null;
	resetPassword:
		| ((oobCode: string, newPassword: string) => Promise<void>)
		| null;
}

// create auth context for React
const AuthContext = createContext<IAuthContext>({
	currentUser: null,
	signInWithEmailAndPassword: null,
	login: null,
	register: null,
	logout: null,
	forgotPassword: null,
	resetPassword: null,
});

// create function to allow our application to load auth context
export const useAuth = () => useContext(AuthContext);

// create component to house the state for auth that can be used by our application
export const AuthContextProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	// update auth state any time changes are made
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
		return () => {
			unsubscribe;
		};
	}, []);

	// the below functions are wrappers for the Firebase provided auth functions
	// wrapping them allows us to call them what we want and pass in the auth object from this component instead of relying on the caller to get that information

	// allow user to sign in with email/pasword
	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	// register a user with new email/password
	function register(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	// send password reset email if requested by user
	function forgotPassword(email: string) {
		return sendPasswordResetEmail(auth, email, {
			url: "http://localhost::3000/login",
		});
	}

	// allow for password reset
	function resetPassword(oobCode: string, newPassword: string) {
		return confirmPasswordReset(auth, oobCode, newPassword);
	}

	// sign out user and clear state
	function logout() {
		return signOut(auth);
	}

	const value: IAuthContext = {
		currentUser,
		signInWithEmailAndPassword,
		login,
		logout,
		register,
		forgotPassword,
		resetPassword,
	};

	// render our application within this AuthContext.Provider to allow our application to access user state wherever we need it
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
