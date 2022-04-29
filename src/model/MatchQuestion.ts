/** @format */

import { Answer, Question, QuestionType } from "./Question";

class MatchQuestion extends Question {
	answerMap: Map<string, string>;
	constructor(
		question: string,
		answerMap: Map<string, string>,
		id: number | null,
	) {
		super(QuestionType.Match, question, [], id);
		this.answerMap = answerMap;
	}
	public correctAnswers(): Answer[] {
		console.log(
			"ERROR: There are no correct answers for a matching question!",
		);
		return [];
	}

	public answerMapArray(): {
		key: string;
		value: string;
	}[] {
		const array = Array.from(this.answerMap, ([key, value]) => ({
			key,
			value,
		}));
		return array;
	}
}

export default MatchQuestion;
