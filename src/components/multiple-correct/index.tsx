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
		setAnswers(["", "", "", "", ""]);
		$("textarea").filter("[id*=answer1-input]").val("");
		$("textarea").filter("[id*=answer2-input]").val("");
		$("textarea").filter("[id*=answer3-input]").val("");
		$("textarea").filter("[id*=answer4-input]").val("");
		$("textarea").filter("[id*=answer5-input]").val("");
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
	const showToast = () => setShow(true);

	const onSubmitExam = () => {
		const typedAnswers = Array<Answer>();
		for (let i = 0; i < 5; i++) {
			const answerID = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
			typedAnswers.push(new Answer(answers[i], isChecked[i], answerID));
		}
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
		showToast();
		clearInput();
	};

	return (
		<div className={styles.questionInput}>
			<textarea
				className={styles.input}
				id='question-input'
				rows={3}
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
				placeholder='Question'
			/>
			{isChecked.map((answer, index) => (
				<div className={styles.checkboxRow} key={index}>
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