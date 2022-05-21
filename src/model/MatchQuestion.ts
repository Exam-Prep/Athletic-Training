/** @format */

import { Answer, Question, QuestionType } from "./Question";

class MatchQuestion extends Question {
	answerMap: Map<string, string>;
	constructor(
		question: string,
		answerMap: Map<string, string>, // match questions use the answer map
		id: number | null,
		imageURL = "",
	) {
		super(QuestionType.Match, question, [], id, imageURL);
		this.answerMap = answerMap;
	}
	// this object does not exist on a match question
	public correctAnswers(): Answer[] {
		console.log(
			"ERROR: There are no correct answers for a matching question!",
		);
		return [];
	}

	// return the answer map as an array
	public answerMapArray(): {
		key: string;
		value: string;
	}[] {
		// make an array out of the keys and values
		const array = Array.from(this.answerMap, ([key, value]) => ({
			key,
			value,
		}));
		return array;
	}
}

export default MatchQuestion;
