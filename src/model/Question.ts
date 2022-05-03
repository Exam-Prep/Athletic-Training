/** @format */

export enum QuestionType {
	MultipleChoice,
	MultipleChoiceMultipleCorrect,
	Match,
	HotSpot,
}
export class Answer {
	answerText: string;
	isCorrect: boolean;
	answerID: number;

	constructor(answerText: string, isCorrect: boolean, answerID: number) {
		this.answerText = answerText;
		this.isCorrect = isCorrect;
		this.answerID = answerID;
	}
}
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
		if (id === null) {
			this.id = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
		} else {
			this.id = id;
		}
	}

	public correctAnswers() {
		return this.answers.filter((answer) => {
			return answer.isCorrect;
		});
	}
}
