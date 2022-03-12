/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { auth } from "./firebase/firebase";
import type { User } from "firebase/auth";
import type { UserCredential } from "firebase/auth";

import {
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

const AuthContext = createContext<IAuthContext>({
	currentUser: null,
	signInWithEmailAndPassword: null,
	login: null,
	register: null,
	logout: null,
	forgotPassword: null,
	resetPassword: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider: React.FC = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
		return () => {
			unsubscribe;
		};
	}, []);

	useEffect(() => {
		console.log("The user is ", currentUser);
	}, [currentUser]);

	function login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function register(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function forgotPassword(email: string) {
		return sendPasswordResetEmail(auth, email, {
			url: "http://localhost::3000/login",
		});
	}

	function resetPassword(oobCode: string, newPassword: string) {
		return confirmPasswordReset(auth, oobCode, newPassword);
	}

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

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
