/** @format */

import { database } from "../firebase/firebase";
import { set, ref, child, onValue } from "firebase/database";
import { Answer, Question, QuestionType } from "./Question";

const examSetRefString = "/exam_set";
const questionRefString = "/questions/";

type PartialExam = {
	lastQuestion: string;
	qID: number;
	title: string;
};
export function getPartialExams() {
	const partialExam = ref(database, examSetRefString);
	const promise = new Promise<Array<Exam>>((resolve, reject) => {
		onValue(
			partialExam,
			(snapshot) => {
				const examData: Map<string, PartialExam> = new Map(
					Object.entries(snapshot.val()),
				);
				const exams = Array<Exam>();
				for (const [key, value] of examData.entries()) {
					const exam = new Exam();
					exam.name = value.title;
					exam.currentQuestionID = value.qID;
					exam.currentQuestionString = value.lastQuestion;
					exam.id = Number(key);
					exams.push(exam);
				}
				resolve(exams);
			},
			(error) => {
				console.log(error);
				reject(
					new Error(
						"Failed to Fetch Question Set Data. Please Try Again",
					),
				);
			},
		);
	});

	return promise;
}

export function loadPartialExam(examID: number) {
	const partialExam = ref(database, examSetRefString + "/" + examID);
	const promise = new Promise<Exam>((resolve, reject) => {
		onValue(
			partialExam,
			(snapshot) => {
				const value: PartialExam = snapshot.val();
				const exam = new Exam();
				exam.name = value.title;
				exam.currentQuestionID = value.qID;
				exam.currentQuestionString = value.lastQuestion;
				exam.id = Number(examID);

				resolve(exam);
			},
			(error) => {
				console.log(error);
				reject(new Error("Failed to Fetch Exam. Please Try Again"));
			},
		);
	});
	return promise;
}

type JSONQuestion = {
	qID: number;
	question: string;

	type: string;
	answers: Map<string, Answer>;
	correctAnswer: string;
};
export class Exam {
	id: number | null = null;
	currentQuestionID = 0;
	currentQuestionString = "";
	name = "";
	questions = Array<Question>();
	currentQuestion: Question | null = null;

	public writeExam() {
		if (this.id == null) {
			this.id = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
		}
		const PartialExamRef = ref(database, examSetRefString);
		set(child(PartialExamRef, this.id.toString()), {
			title: this.name,
			lastQuestion: this.currentQuestion?.question ?? "",
			qID: this.currentQuestion?.id ?? 0,
		});
		this.questions.forEach((question) => {
			const questionsRef = ref(database, questionRefString + this.id);
			set(child(questionsRef, question.id.toString()), {
				qID: question.id,
				question: question.question,
				answers: question.answers,
				correctAnswers: question.correctAnswers(),
				type: question.type,
			});
		});
	}

	private loadQuestions() {
		const promise = new Promise<Array<Question>>((resolve, reject) => {
			const reference = ref(database, questionRefString + this.id);
			onValue(
				reference,
				(snapshot) => {
					const questionData: Map<string, JSONQuestion> = new Map(
						Object.entries(snapshot.val()),
					);
					const questions = Array<Question>();
					for (const value of questionData.values()) {
						const answers = Array<Answer>();
						for (const answer of value.answers.values()) {
							answers.push(answer);
						}
						const question = new Question(
							QuestionType[
								value.type as keyof typeof QuestionType
							],
							value.question,
							answers,
							value.qID,
						);
						questions.push(question);
					}
					resolve(questions);
				},
				(error) => {
					console.log(error);
					reject(
						new Error(
							"Downloading Existing Questions FAILED. Please Try Again.",
						),
					);
				},
			);
		});
		return promise;
	}

	public downloadExistingQuestionsIfNecessary() {
		const promise = new Promise<Exam>((resolve, reject) => {
			this.loadQuestions()
				.then((qs) => {
					if (this.questions.length < 1) {
						this.questions = qs;
					} else {
						this.questions.concat(qs);
					}
					this.currentQuestion = this.questions.filter(
						(question) => question.id === this.currentQuestionID,
					)[0];
					resolve(this);
				})
				.catch((error) => {
					reject(error);
				});
		});
		return promise;
	}
}
