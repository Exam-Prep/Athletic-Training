/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { Answer, Question, QuestionType } from "../../model/Question";
import { Exam } from "../../model/Exam";
import { Modal, Tab, Tabs, Toast, ToastContainer } from "react-bootstrap";
import $ from "jquery";
import CreateMatchQuestion from "../create-match-question";

import ImageUploader from "../image-upload";
import MultipleChoiceMultipleCorrect from "../multiple-correct";
import CreateHotSpot from "../create-hot-spot";
interface QuestionWriterUIProps {
	hide: boolean;
	close: () => void;
	selectedExam: Exam;
}

function clearInput() {
	$("textarea").filter("[id*=question-input]").val("");
	$("textarea").filter("[id*=answer1-input]").val("");
	$("textarea").filter("[id*=answer2-input]").val("");
	$("textarea").filter("[id*=answer3-input]").val("");
	$("textarea").filter("[id*=answer4-input]").val("");
	$("textarea").filter("[id*=answer5-input]").val("");
}

const QuestionWriterUI: React.FunctionComponent<QuestionWriterUIProps> = ({
	hide,
	close,
	selectedExam,
}) => {
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(new Map<number, string>());
	const [correctQuestion, setCorrectQuestion] = useState(1);
	const [imageURL, setImageURL] = useState<string>("");
	const [key, setKey] = useState("multiple-choice");
	const [show, setShow] = useState(false);

	const [image, setImage] = useState(false);
	const showModal = () => setImage(true);
	const closeModal = () => setImage(false);

	const updateSetImageURL = (url: string): void => {
		setImageURL(url);
	};
	const showToast = () => setShow(true);

	const onSubmitExam = () => {
		const exam = selectedExam;
		const typedAnswers = Array<Answer>();
		answers.forEach((inputedAnswer, answerOrder) => {
			const answerID = Math.floor(
				Math.random() * Math.floor(Math.random() * Date.now()),
			);
			typedAnswers.push(
				new Answer(
					inputedAnswer,
					answerOrder === correctQuestion,
					answerID,
				),
			);
		});
		const typedQuestion = new Question(
			QuestionType.MultipleChoice,
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
		<div>
			<Modal dialogClassName={styles.modal} show={hide} onHide={close}>
				<Modal.Header>
					<Modal.Title>Add Question</Modal.Title>
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
				</Modal.Header>
				<Modal.Body>
					<Tabs
						id='question-types'
						activeKey={key}
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						onSelect={(k) => setKey(k!)}
						className='mb-3'
					>
						<Tab eventKey='multiple-choice' title='Multiple Choice'>
							<div className={styles.questionInput}>
								<textarea
									className={styles.input}
									id='question-input'
									rows={3}
									onChange={(e) =>
										setQuestion(e.target.value)
									}
									placeholder='Question'
								/>
								<textarea
									className={styles.input}
									id='answer1-input'
									onChange={(e) =>
										setAnswers((existingAnswer) => {
											existingAnswer.set(
												1,
												e.target.value,
											);
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
											existingAnswer.set(
												2,
												e.target.value,
											);
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
											existingAnswer.set(
												3,
												e.target.value,
											);
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
											existingAnswer.set(
												4,
												e.target.value,
											);
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
											existingAnswer.set(
												5,
												e.target.value,
											);
											return existingAnswer;
										})
									}
									placeholder='Answer 5'
								/>
								<select
									className={styles.select}
									value={correctQuestion}
									onChange={(e) =>
										setCorrectQuestion(
											parseInt(e.target.value),
										)
									}
									name='correctAnswer'
									id='correctAnswer'
								>
									<option value='1'>Answer 1</option>
									<option value='2'>Answer 2</option>
									<option value='3'>Answer 3</option>
									<option value='4'>Answer 4</option>
									<option value='5'>Answer 5</option>
								</select>
								<button
									className={styles.addQuestionButton}
									onClick={showModal}
								>
									Add Image
								</button>
								<button
									className={styles.addQuestionButton}
									onClick={onSubmitExam}
								>
									Add Question
								</button>
							</div>
						</Tab>
						<Tab
							eventKey='select-all'
							title='Select All that Apply'
						>
							<MultipleChoiceMultipleCorrect
								exam={selectedExam}
							/>
						</Tab>
						<Tab eventKey='drag-and-drop' title='Drag and Drop'>
							<CreateMatchQuestion exam={selectedExam} />
						</Tab>
						<Tab eventKey='hot-spot' title='Hot Spot'>
							<CreateHotSpot exam={selectedExam} />
						</Tab>
					</Tabs>
				</Modal.Body>
				<Modal.Footer>
					<button className={styles.close} onClick={close}>
						Close
					</button>
				</Modal.Footer>
			</Modal>
			{selectedExam != undefined ? (
				<ImageUploader
					hide={image}
					examString={selectedExam.name}
					updateImageURL={updateSetImageURL}
					closeModal={closeModal}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default QuestionWriterUI;
