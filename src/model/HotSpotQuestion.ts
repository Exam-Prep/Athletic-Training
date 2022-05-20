/** @format */

import { Answer, Question, QuestionType } from "./Question";

class HotSpotQuestion extends Question {
	static width = 50;
	static height = 50;
	static offset = 25;

	x: number;
	y: number;
	constructor(
		question: string,
		id: number | null,
		xCoordinate: number,
		yCoordinate: number,
		imageURL: string,
	) {
		super(QuestionType.HotSpot, question, [], id, imageURL);
		this.x = xCoordinate;
		this.y = yCoordinate;
	}

	public correctAnswers(): Answer[] {
		console.log(
			"ERROR: There are no correct answers for a hot spot question!",
		);
		return [];
	}

	public isCoordinateWithinRange(x: number, y: number) {
		const correctThreshold = 0.08;
		const xCorrect = Math.abs(x - this.x);
		const yCorrect = Math.abs(y - this.y);
		// if x and y are within 8% of each other, correct
		if (xCorrect < correctThreshold && yCorrect < correctThreshold) {
			return true;
		}
		return false;
	}
}

export default HotSpotQuestion;
