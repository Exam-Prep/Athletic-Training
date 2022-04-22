/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { Answer, Question, QuestionType } from "../../model/Question";
import { Exam } from "../../model/Exam";
import { Modal, Tab, Tabs, Toast } from "react-bootstrap";

interface QuestionWriterUIProps {
	hide: boolean;
	close: () => void;
	selectedExam: Exam;
}

const QuestionWriterUI: React.FunctionComponent<QuestionWriterUIProps> = ({
	hide,
	close,
	selectedExam,
}) => {
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(new Map<number, string>());
	const [correctQuestion, setCorrectQuestion] = useState(1);
	const [key, setKey] = useState("multiple-choice");
	const [val, setValue] = useState();
	const [show, setShow] = useState(false);

	const onSubmitExam = () => {
		const exam = selectedExam;
		const showToast = () => setShow(true);

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
		);
		exam.questions.push(typedQuestion);
		exam.currentQuestion = exam.questions[0];
		exam.writeExam();
		showToast();
		// () => setValue(() => "");
	};

	return (
		<div>
			<Modal dialogClassName={styles.modal} show={hide} onHide={close}>
				<Modal.Header>
					<Modal.Title>Add Question</Modal.Title>
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
									rows='3'
									value={val}
									onChange={(e) =>
										setQuestion(e.target.value)
									}
									placeholder='Question'
								/>
								<input
									className={styles.input}
									type='text'
									value={val}
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
								<input
									className={styles.input}
									type='text'
									value={val}
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
								<input
									className={styles.input}
									type='text'
									value={val}
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
								<input
									className={styles.input}
									type='text'
									value={val}
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
								<input
									className={styles.input}
									type='text'
									value={val}
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
							This will be Select all that Apply
						</Tab>
						<Tab eventKey='drag-and-drop' title='Drag and Drop'>
							This will be Drag and Drop
						</Tab>
						<Tab eventKey='hot-spot' title='Hot Spot'>
							This will be Hot Spot
						</Tab>
					</Tabs>
				</Modal.Body>
				<Modal.Footer>
					<button className={styles.close} onClick={close}>
						Close
					</button>
				</Modal.Footer>
			</Modal>
			{/* <Toast
			onClose={() => setShow(false)}
			show={show}
			delay={3000}
			autohide
		>
			<Toast.Header>{selectedExam.name}</Toast.Header>
			<Toast.Body>Question Added!</Toast.Body>
		</Toast> */}
		</div>
	);
};

export default QuestionWriterUI;
