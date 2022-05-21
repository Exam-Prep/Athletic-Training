/** @format */

import { database } from "../firebase/firebase";
import { set, ref, child, onValue, remove } from "firebase/database";

// shape attempted answers should conform to
export class AttemptedAnswer {
	qID: number;
	isCorrect: boolean;
	answer: Array<string> | undefined;
	answerMap: Map<string, string> | undefined;
	x: number;
	y: number;

	// constructor for creating new AttemptedAnswer
	// some defaults are set because not all answers need all variables
	constructor(
		qID: number,
		isCorrect: boolean,
		answer: Array<string> | undefined = undefined,
		answerMap: Map<string, string> | undefined = undefined,
		x = 0,
		y = 0,
	) {
		this.qID = qID;
		this.isCorrect = isCorrect;
		this.answer = answer;
		this.answerMap = answerMap;
		this.x = x;
		this.y = y;
	}

	// map key value pairs into an array
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

// compare two answer maps to determine if they are the same
export function answerMapsEqual(
	map1: Map<string, string>,
	map2: Map<string, string>,
) {
	let testVal;
	if (map1.size !== map2.size) {
		return false;
	}
	for (const [key, val] of map1) {
		testVal = map2.get(key);
		// in cases of an undefined value, make sure the key
		// actually exists on the object so there are no false positives
		if (testVal !== val || (testVal === undefined && !map2.has(key))) {
			return false;
		}
	}
	return true;
}

// A user object is specific to a given exam.
export class User {
	id: string;
	email: string;
	examID: number;
	questionIndex: number;
	attemptedAnswers: Array<AttemptedAnswer>;

	// allow for the creation of a new user
	// all values are required
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

	// check to see if this user has any progress saved for an exam
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

	// add a new answer attempt if one does not exist and update it if it does
	public addOrUpdateAnswer(answer: AttemptedAnswer) {
		let found = false;

		// scan through all attempted answers to see if one has this question's id
		for (let i = 0; i < this.attemptedAnswers.length; i++) {
			// if the id matches, update instead of creating a new entry
			// since only the most recent AttemptedAnswer is saved, we can break if we find it
			if (this.attemptedAnswers[i].qID === answer.qID) {
				this.attemptedAnswers[i] = answer;
				found = true;
				break;
			}
		}
		// no matching id was found, so add this one to the array
		if (!found) {
			this.attemptedAnswers.push(answer);
		}
		// save to Firebase
		writeCurrentProgress(this);
	}

	// get a user's attempted answer for a specific question
	// returns undefined if not found
	public attemptedAnswerForID(questionID: number) {
		const filteredAnswers = this.attemptedAnswers.filter((x) => {
			return x.qID === questionID;
		});

		if (filteredAnswers.length === 1) {
			return filteredAnswers[0];
		} else {
			return undefined;
		}
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
	x: number;
	y: number;
};

const userRefString = "/examState/";
// load the current user's data from Firebase for an exam
export function fetchCurrentUserProgress(examID: number, userID: string) {
	return new Promise<User>((resolve, reject) => {
		// get reference to data in Firebase
		const userRef = ref(database, userRefString + examID + "/" + userID);
		onValue(
			userRef,
			// use data snapshot to populate our class
			(snapshot) => {
				if (snapshot.exists()) {
					const val = snapshot.val();
					const attemptedAnswers = Array<AttemptedAnswer>();
					if (val.attemptedAnswers !== undefined) {
						const attemptedAnswersData: Map<
							string,
							JSONAttemptedAnswer
						> = new Map(Object.entries(val.attemptedAnswers));
						for (const [
							key,
							attemptedAnswerJSON,
						] of attemptedAnswersData.entries()) {
							const answerMap = new Map<string, string>();
							if (attemptedAnswerJSON.answerMap != undefined) {
								attemptedAnswerJSON.answerMap.forEach(
									(answerMapValue) => {
										answerMap.set(
											answerMapValue.key,
											answerMapValue.value,
										);
									},
								);
							}
							const attemptedAnswer = new AttemptedAnswer(
								parseInt(key),
								attemptedAnswerJSON.isCorrect,
								attemptedAnswerJSON.answer,
								answerMap,
								attemptedAnswerJSON.x,
								attemptedAnswerJSON.y,
							);
							attemptedAnswers.push(attemptedAnswer);
						}
					}
					// put all this data on a user
					const user = new User(
						userID,
						examID,
						attemptedAnswers,
						val.questionIndex,
						val.email,
					);

					// resolve new user for caller
					resolve(user);
				} else {
					// reject promise if user does not exist
					reject(new Error("User does not exist in database"));
				}
			},
			// catch any errors and reject with error message
			(error) => {
				console.log(error);
				reject(error);
			},
		);
	});
}

// save user's data to Firebase
// private
// should be called whenever data is updated by the user
function writeCurrentProgress(user: User) {
	// get reference to data in Firebase
	const examRef = ref(database, userRefString + user.examID);
	// write data for this user
	set(child(examRef, user.id), {
		email: user.email,
		questionIndex: user.questionIndex,
	});
	const userRef = ref(database, userRefString + user.examID + "/" + user.id);

	// save user's attempted answers for this exam
	user.attemptedAnswers.forEach((answer) => {
		set(child(userRef, "attemptedAnswers" + "/" + answer.qID), {
			isCorrect: answer.isCorrect,
			answer: answer.answer ?? Array<AttemptedAnswer>(),
			answerMap: answer.answerMapArray(),
			x: answer.x,
			y: answer.y,
		});
	});
}

// delete a user from Firebase
// DANGER!
export function deleteUser(user: User) {
	const userRef = ref(database, userRefString + user.examID + "/" + user.id);
	return remove(userRef);
}
