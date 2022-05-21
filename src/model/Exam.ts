/** @format */

import { database } from "../firebase/firebase";
import { set, ref, child, onValue, remove } from "firebase/database";
import { Answer, Question, QuestionType } from "./Question";
import MatchQuestion from "./MatchQuestion";
import HotSpotQuestion from "./HotSpotQuestion";

const examSetRefString = "/exam_set";
const questionRefString = "/questions/";

// partial exam holds only the exam name, and a question/its id
type PartialExam = {
	lastQuestion: string;
	qID: number;
	title: string;
};
// generate partial exams for an exam
export function getPartialExams() {
	// reference the correct spot in firebase
	const partialExam = ref(database, examSetRefString);
	return new Promise<Array<Exam>>((resolve, reject) => {
		// load an array of partial exams from firebase
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
			// display the error message if something went wrong
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

// get a partial exam from the database
export function loadPartialExam(examID: number) {
	// reference the correct spot in firebase
	const partialExam = ref(database, examSetRefString + "/" + examID);
	return new Promise<Exam>((resolve, reject) => {
		// create a new partial exam if we get the data
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
			// display the error message if something went wrong
			(error) => {
				console.log(error);
				reject(new Error("Failed to Fetch Exam. Please Try Again"));
			},
		);
	});
}

// structure of a question
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
	x: number;
	y: number;
};

// structure of an exam
export class Exam {
	// necessary components of an exam object
	id: number | null = null;
	currentQuestionID = 0;
	currentQuestionString = "";
	name = "";
	questions = Array<Question>();
	currentQuestion: Question | null = null;

	// write to an exam
	public writeExam() {
		// assign an id if there is not one
		if (this.id == null) {
			this.id = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
		}
		// reference the partial exam
		const PartialExamRef = ref(database, examSetRefString);
		// set the data from the partial exam to this exam
		set(child(PartialExamRef, this.id.toString()), {
			title: this.name,
			lastQuestion: this.currentQuestion?.question ?? "",
			qID: this.currentQuestion?.id ?? 0,
		});
		// set all questions within the exam
		this.questions.forEach((question) => {
			const questionsRef = ref(database, questionRefString + this.id);
			// set different data based on question type
			if (
				question.type == QuestionType.MultipleChoice ||
				question.type == QuestionType.MultipleChoiceMultipleCorrect
			) {
				set(child(questionsRef, question.id.toString()), {
					qID: question.id,
					question: question.question,
					answers: question.answers,
					correctAnswers: question.correctAnswers(),
					type: question.type,
					imageURL: question.imageURL,
				});
			} else if (question.type === QuestionType.Match) {
				const questionMatch = question as MatchQuestion;
				set(child(questionsRef, question.id.toString()), {
					qID: questionMatch.id,
					question: questionMatch.question,
					answerMap: questionMatch.answerMapArray(),
					imageURL: questionMatch.imageURL,
					type: questionMatch.type,
				});
			} else if (question.type === QuestionType.HotSpot) {
				const hotSpotQuestion = question as HotSpotQuestion;
				set(child(questionsRef, hotSpotQuestion.id.toString()), {
					qID: hotSpotQuestion.id,
					question: hotSpotQuestion.question,
					imageURL: hotSpotQuestion.imageURL,
					type: hotSpotQuestion.type,
					x: hotSpotQuestion.x,
					y: hotSpotQuestion.y,
				});
			}
		});
	}

	// load all questions for this exam
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
						if (value.question === "" || value.type === undefined) {
							// We don't care about empty questions.
							continue;
						}
						const questionType = parseInt(value.type);
						// make the answers array if multiple choice/multiple correct
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
							// make the answer map if matching
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
							// set coordinates if a hot spot
						} else if (questionType === QuestionType.HotSpot) {
							const hotSpotQuestion = new HotSpotQuestion(
								value.question,
								value.qID,
								value.x,
								value.y,
								value.imageURL,
							);
							questions.push(hotSpotQuestion);
							// questions without a type are bad
						} else {
							console.log(
								"SEVERE ERROR, every question must have a type.",
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
	// delete a specific question
	public deleteQuestion(question: Question) {
		// reference the correct question
		const deleteQuestionRef = ref(
			database,
			questionRefString + "/" + this.id + "/" + question.id,
		);
		// set questions to all the questions but the one being deleted
		this.questions = this.questions.filter((x) => x.id !== question.id);
		// reset the current question of the exam
		this.currentQuestion = this.questions[0];
		// save these changes
		this.writeExam();
		// delete the question from the database
		return remove(deleteQuestionRef);
	}
	// reference the questions in the database and delete
	public deleteExamQuestions() {
		const deleteExamQuestionsRef = ref(
			database,
			questionRefString + this.id,
		);
		return remove(deleteExamQuestionsRef);
	}
	// reference the correct spot in the database and delete
	public deleteExam() {
		const deleteExamRef = ref(database, examSetRefString + "/" + this.id);
		return remove(deleteExamRef);
	}

	// download questions from the database
	public downloadExistingQuestionsIfNecessary() {
		const promise = new Promise<Exam>((resolve, reject) => {
			this.loadQuestions()
				.then((qs) => {
					// if no questions here, just take all of them
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
