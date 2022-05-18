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
			"ERROR: There are no correct answers for a matching question!",
		);
		return [];
	}

	public isCoordinateWithinRange(x: number, y: number) {
		const XSquared = (x - this.x) * (x - this.x);
		const YSquared = (y - this.y) * (y - this.y);
		const distance = Math.sqrt(XSquared + YSquared);
		console.log(distance, distance <= 50);
		return distance <= HotSpotQuestion.width;
	}
}

export default HotSpotQuestion;
