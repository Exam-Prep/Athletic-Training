/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Answer, Question, QuestionType } from "../../model/Question";
import { Exam } from "../../model/Exam";
import { Modal, Tab, Tabs, Toast, ToastContainer } from "react-bootstrap";
import $ from "jquery";
import CreateMatchQuestion from "../create-match-question";
import Checkbox from "../check-box";

import ImageUploader from "../image-upload";
import { textSpanIntersection } from "typescript";

interface MultipleChoiceMultipleCorrectProps {
	exam: Exam;
}

const MultipleChoiceMultipleCorrect: React.FunctionComponent<
	MultipleChoiceMultipleCorrectProps
> = ({ exam }) => {
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(new Map<number, string>());
	const [imageURL, setImageURL] = useState<string>("");
	const [image, setImage] = useState(false);
	const showModal = () => setImage(true);
	const closeModal = () => setImage(false);
	const [isChecked, setIsChecked] = useState<Array<boolean>>([
		false,
		false,
		false,
		false,
		false,
	]);
	const clearInput = () => {
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		setIsChecked([false, false, false, false, false]);
		setQuestion("");
		setAnswers(new Map<number, string>());
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		setIsChecked((existingIsChecked) => {
			existingIsChecked[index] = e.target.checked;
			return [...existingIsChecked];
		});
	};
	const updateSetImageURL = (url: string): void => {
		setImageURL(url);
	};
	// const showToast = () => setShow(true);
	const onSubmitExam = () => {
		const typedAnswers = Array<Answer>();

		answers.forEach((inputedAnswer, answerOrder) => {
			const answerID = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
			typedAnswers.push(
				new Answer(inputedAnswer, isChecked[answerOrder], answerID),
			);
		});
		const typedQuestion = new Question(
			QuestionType.MultipleChoiceMultipleCorrect,
			question,
			typedAnswers,
			null,
			imageURL,
		);
		exam.questions.push(typedQuestion);
		exam.currentQuestion = exam.questions[0];
		exam.writeExam();
		// showToast();
		clearInput();
	};

	const checkboxItems = () => {
		return (
			<div>
				{isChecked.map((answer, index) => (
					<Checkbox
						key={index}
						label={(index + 1).toString()}
						handleChange={(e) => handleChange(e, index)}
						isChecked={answer}
					></Checkbox>
				))}
			</div>
		);
	};

	return (
		<div className={styles.questionInput}>
			<textarea
				className={styles.input}
				id='question-input'
				rows={3}
				onChange={(e) => setQuestion(e.target.value)}
				placeholder='Question'
			/>

			<textarea
				className={styles.input}
				id='answer1-input'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(0, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 1'
			/>
			<textarea
				className={styles.input}
				id='answer2-input'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(1, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 2'
			/>
			<textarea
				className={styles.input}
				id='answer3-input'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(2, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 3'
			/>
			<textarea
				className={styles.input}
				id='answer4-input'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(3, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 4'
			/>
			<textarea
				className={styles.input}
				id='answer5-input'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(4, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 5'
			/>

			{/* <select
				className={styles.select}
				value={correctQuestion}
				onChange={(e) => setCorrectQuestion(parseInt(e.target.value))}
				name='correctAnswer'
				id='correctAnswer'
			>
				<option value='1'>Answer 1</option>
				<option value='2'>Answer 2</option>
				<option value='3'>Answer 3</option>
				<option value='4'>Answer 4</option>
				<option value='5'>Answer 5</option>
			</select> */}
			{checkboxItems()}

			<button className={styles.addQuestionButton} onClick={onSubmitExam}>
				Add Question
			</button>
		</div>
	);
};

export default MultipleChoiceMultipleCorrect;
