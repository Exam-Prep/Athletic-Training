/** @format */

import { database } from "../firebase/firebase";
import { set, ref, child, onValue } from "firebase/database";
import { Answer, Question, QuestionType } from "./Question";
import MatchQuestion from "./MatchQuestion";

const examSetRefString = "/exam_set";
const questionRefString = "/questions/";

type PartialExam = {
	lastQuestion: string;
	qID: number;
	title: string;
};
export function getPartialExams() {
	const partialExam = ref(database, examSetRefString);
	return new Promise<Array<Exam>>((resolve, reject) => {
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
}

export function loadPartialExam(examID: number) {
	const partialExam = ref(database, examSetRefString + "/" + examID);
	return new Promise<Exam>((resolve, reject) => {
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
}

type JSONQuestion = {
	qID: number;
	question: string;
	imageURL: string;
	type: string;
	answers: Map<string, Answer>;
	correctAnswer: string;
	answerMap: {
		key: string;
		value: string;
	}[];
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
			if (question.type == QuestionType.MultipleChoice) {
				set(child(questionsRef, question.id.toString()), {
					qID: question.id,
					question: question.question,
					answers: question.answers,
					correctAnswers: question.correctAnswers(),
					type: question.type,
					imageURL: question.imageURL,
				});
			} else if (question.type == QuestionType.Match) {
				const questionMatch = question as MatchQuestion;
				set(child(questionsRef, question.id.toString()), {
					qID: questionMatch.id,
					question: questionMatch.question,
					answerMap: questionMatch.answerMapArray(),
					imageURL: question.imageURL,
					type: question.type,
				});
			}
		});
	}

	private loadQuestions() {
		return new Promise<Array<Question>>((resolve, reject) => {
			const reference = ref(database, questionRefString + this.id);
			onValue(
				reference,
				(snapshot) => {
					const questionData: Map<string, JSONQuestion> = new Map(
						Object.entries(snapshot.val()),
					);
					const questions = Array<Question>();
					for (const value of questionData.values()) {
						const questionType = parseInt(value.type);
						if (
							questionType === QuestionType.MultipleChoice ||
							questionType ===
								QuestionType.MultipleChoiceMultipleCorrect
						) {
							const answers = Array<Answer>();
							for (const answer of value.answers.values()) {
								answers.push(answer);
							}
							const question = new Question(
								questionType,
								value.question,
								answers,
								value.qID,
								value.imageURL,
							);
							questions.push(question);
						} else if (questionType === QuestionType.Match) {
							const answerMap = new Map<string, string>();
							value.answerMap.forEach((answerMapValue) => {
								answerMap.set(
									answerMapValue.key,
									answerMapValue.value,
								);
							});
							const matchQuestion = new MatchQuestion(
								value.question,
								answerMap,
								value.qID,
								value.imageURL,
							);
							questions.push(matchQuestion);
						} else {
							console.log(
								"FIXME add support for hot spot questions",
							);
						}
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
