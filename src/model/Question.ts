/** @format */

// allow for 4 question types
export enum QuestionType {
	MultipleChoice,
	MultipleChoiceMultipleCorrect,
	Match,
	HotSpot,
}
// An answer to a question
export class Answer {
	// answers have the text of the chosen answer, whether or not it is correct, and an id
	answerText: string;
	isCorrect: boolean;
	answerID: number;

	constructor(answerText: string, isCorrect: boolean, answerID: number) {
		this.answerText = answerText;
		this.isCorrect = isCorrect;
		this.answerID = answerID;
	}
}
// A question has question text, an array of answers, id, type, and image urls
export class Question {
	question: string;
	answers: Array<Answer>;
	id = 0;
	type: QuestionType;
	imageURL: string;

	constructor(
		type: QuestionType,
		question: string,
		answers: Array<Answer>,
		id: number | null = null,
		imageURL = "",
	) {
		this.imageURL = imageURL;
		this.type = type;
		this.question = question;
		this.answers = answers;
		// assign a random id
		if (id === null) {
			this.id = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
		} else {
			this.id = id;
		}
	}

	// get correct answers array
	public correctAnswers() {
		return this.answers.filter((answer) => {
			return answer.isCorrect;
		});
	}
}
