/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Answer, Question, QuestionType } from "../../model/Question";
import { Exam } from "../../model/Exam";
import $ from "jquery";
import { Toast, ToastContainer } from "react-bootstrap";
import Checkbox from "../check-box";

import ImageUploader from "../image-upload";

interface MultipleChoiceMultipleCorrectProps {
	exam: Exam;
}

const MultipleChoiceMultipleCorrect: React.FunctionComponent<
	MultipleChoiceMultipleCorrectProps
> = ({ exam }) => {
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(["", "", "", "", ""]);
	const [imageURL, setImageURL] = useState<string>("");
	const [image, setImage] = useState(false);
	const showModal = () => setImage(true);
	const closeModal = () => setImage(false);
	const [show, setShow] = useState(false);
	// default state is all false
	const [isChecked, setIsChecked] = useState<Array<boolean>>([
		false,
		false,
		false,
		false,
		false,
	]);
	// clear checkboxes, text input to be false/empty
	const clearInput = () => {
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		$("input[type=checkbox]").prop("checked", false);
		setIsChecked([false, false, false, false, false]);
		setQuestion("");
		setAnswers(["", "", "", "", ""]);
		$("textarea").filter("[id*=answer1-input]").val("");
		$("textarea").filter("[id*=answer2-input]").val("");
		$("textarea").filter("[id*=answer3-input]").val("");
		$("textarea").filter("[id*=answer4-input]").val("");
		$("textarea").filter("[id*=answer5-input]").val("");
	};

	// when something changes, record that in state
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		setIsChecked((existingIsChecked) => {
			existingIsChecked[index] = e.target.checked;
			return [...existingIsChecked];
		});
	};
	// set the image URL if an image is added
	const updateSetImageURL = (url: string): void => {
		setImageURL(url);
	};
	// show success toast
	const showToast = () => setShow(true);

	// record input and write to the database
	const onSubmitExam = () => {
		const typedAnswers = Array<Answer>();
		for (let i = 0; i < 5; i++) {
			// generate an answer id
			const answerID = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
			// record the content of this answer
			typedAnswers.push(new Answer(answers[i], isChecked[i], answerID));
		}
		// create a new question with the entered data
		const typedQuestion = new Question(
			QuestionType.MultipleChoiceMultipleCorrect,
			question,
			typedAnswers,
			null,
			imageURL,
		);
		// put the data in the exam and write to the database
		exam.questions.push(typedQuestion);
		exam.currentQuestion = exam.questions[0];
		exam.writeExam();
		showToast();
		clearInput();
	};

	return (
		<div className={styles.questionInput}>
			{/* question input */}
			<textarea
				className={styles.input}
				id='question-input'
				rows={3}
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				placeholder='Question'
			/>
			{/* map the select all inputs */}
			{isChecked.map((answer, index) => (
				<div className={styles.checkboxRow} key={index}>
					{/* put a checkbox in front of a text input */}
					<Checkbox
						key={index}
						handleChange={(e) => handleChange(e, index)}
						isChecked={answer}
					/>
					<textarea
						className={styles.answerInput}
						id={`answer${index + 1}-input`}
						value={answers[index]}
						onChange={(e) => {
							e.stopPropagation();
							setAnswers((existingAnswers) => {
								existingAnswers[index] = e.target.value;
								return [...existingAnswers];
							});
						}}
						placeholder={`Answer ${index + 1}`}
					/>
				</div>
			))}
			{/* toast to show success */}
			<ToastContainer position='top-center'>
				<Toast
					onClose={() => setShow(false)}
					show={show}
					delay={3000}
					autohide
				>
					<Toast.Body>Question Added!</Toast.Body>
				</Toast>
			</ToastContainer>
			<button className={styles.addImageButton} onClick={showModal}>
				Add Image
			</button>
			{exam != undefined ? (
				<ImageUploader
					hide={image}
					examString={exam.name}
					updateImageURL={updateSetImageURL}
					closeModal={closeModal}
				/>
			) : (
				""
			)}
			<button className={styles.addQuestionButton} onClick={onSubmitExam}>
				Add Question
			</button>
		</div>
	);
};

export default MultipleChoiceMultipleCorrect;
