/** @format */

import { database } from "../firebase/firebase";
import { set, ref, child, onValue } from "firebase/database";

export class AttemptedAnswer {
	qID: number;
	isCorrect: boolean;
	answer: Array<string> | undefined;
	answerMap: Map<string, string> | undefined;

	constructor(
		qID: number,
		isCorrect: boolean,
		answer: Array<string> | undefined = undefined,
		answerMap: Map<string, string> | undefined = undefined,
	) {
		this.qID = qID;
		this.isCorrect = isCorrect;
		this.answer = answer;
		this.answerMap = answerMap;
	}

	public answerMapArray(): {
		key: string;
		value: string;
	}[] {
		if (this.answerMap === undefined) {
			return [];
		} else {
			const array = Array.from(this.answerMap, ([key, value]) => ({
				key,
				value,
			}));
			return array;
		}
	}
}

// A user objectis specific to a given exam.
export class User {
	id: string;
	email: string;
	examID: number;
	questionIndex: number;
	attemptedAnswers: Array<AttemptedAnswer>;

	constructor(
		id: string,
		examID: number,
		attemptedAnswers: Array<AttemptedAnswer>,
		questionIndex: number,
		email: string,
	) {
		this.id = id;
		this.examID = examID;
		this.attemptedAnswers = attemptedAnswers;
		this.questionIndex = questionIndex;
		this.email = email;
	}

	static checkForUserForExam(
		examID: number,
		userIndex: number,
		userID: string,
		email: string,
	) {
		return new Promise<User>((resolve, _) => {
			fetchCurrentUserProgress(examID, userID)
				.then((user) => {
					resolve(user);
				})
				.catch((_) => {
					const user = new User(
						userID,
						examID,
						new Array<AttemptedAnswer>(),
						userIndex,
						email ?? "",
					);
					resolve(user);
				});
		});
	}
}

type JSONAttemptedAnswer = {
	type: string;
	isCorrect: boolean;
	answer: Array<string>;
	answerMap: {
		key: string;
		value: string;
	}[];
};

const userRefString = "/examState/";
export function fetchCurrentUserProgress(examID: number, userID: string) {
	return new Promise<User>((resolve, reject) => {
		const userRef = ref(database, userRefString + examID + "/" + userID);
		onValue(
			userRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const val = snapshot.val();
					const attemptedAnswersData: Map<
						string,
						JSONAttemptedAnswer
					> = new Map(Object.entries(val.attemptedAnswers));
					const attemptedAnswers = Array<AttemptedAnswer>();
					for (const [
						key,
						attemptedAnswerJSON,
					] of attemptedAnswersData.entries()) {
						const answerMap = new Map<string, string>();
						attemptedAnswerJSON.answerMap.forEach(
							(answerMapValue) => {
								answerMap.set(
									answerMapValue.key,
									answerMapValue.value,
								);
							},
						);
						const attemptedAnswer = new AttemptedAnswer(
							parseInt(key),
							attemptedAnswerJSON.isCorrect,
							attemptedAnswerJSON.answer,
							answerMap,
						);
						attemptedAnswers.push(attemptedAnswer);
					}
					const user = new User(
						val.id,
						val.examID,
						attemptedAnswers,
						val.questionIndex,
						val.email,
					);
					resolve(user);
				} else {
					reject(new Error("User does not exist in database"));
				}
			},
			(error) => {
				console.log(error);
				reject(error);
			},
		);
	});
}
export function writeCurrentProgress(user: User) {
	const examRef = ref(database, userRefString + user.examID);
	set(child(examRef, user.id), {
		email: user.email,
		questionIndex: user.questionIndex,
	});
	const userRef = ref(database, userRefString + user.examID + "/" + user.id);
	user.attemptedAnswers.forEach((answer) => {
		set(child(userRef, "attemptedAnswers" + "/" + answer.qID), {
			isCorrect: answer.isCorrect,
			answer: answer.answer,
			answerMap: answer.answerMapArray(),
		});
	});
}
