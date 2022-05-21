/** @format */

// calculate if the question has been finished
export function didFinishQuestion(
	dropNames: string[],
	answerMap: Map<string, string>,
) {
	const keys = Array.from(answerMap.keys());
	const ready = dropNames.filter((value) => {
		return keys.includes(value);
	});
	return ready.length == dropNames.length && ready.length != 0;
}
