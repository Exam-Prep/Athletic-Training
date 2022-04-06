/** @format */
import React, { useState } from "react";
import styles from "./styles.scss";
import { Answer, Question, QuestionType } from "../../model/Question";
import { Exam, getPartialExams } from "../../model/Exam";

const QuestionWriterUI = () => {
	const [examName, setExamName] = useState("");
	const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
	const [question, setQuestion] = useState("");
	const [answers, setAnswers] = useState(new Map<number, string>());
	const [correctQuestion, setCorrectQuestion] = useState(1);
	const [exams, setExams] = useState<Array<Exam>>([]);

	const onSubmitExam = () => {
		let exam: Exam;
		if (selectedExam === null) {
			exam = new Exam();
			exam.name = examName;
		} else {
			//This is a safe unwrap.
			exam = selectedExam!;
		}

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
	};

	const onSubmitFetchExams = () => {
		getPartialExams().then((exams) => {
			setExams(exams);
		});
	};

	const onClickExistingExam = (exam: Exam) => {
		setExamName(exam.name);
		setSelectedExam(exam);
		exam.downloadExistingQuestionsIfNecessary();
	};

	return (
		<div className={styles.questionInput}>
			<input
				type='text'
				value={examName}
				onChange={(e) => {
					setExamName(e.target.value);
					setSelectedExam(null);
				}}
				placeholder='Exam name'
			/>
			<input
				type='text'
				onChange={(e) => setQuestion(e.target.value)}
				placeholder='Question'
			/>
			<input
				type='text'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(1, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 1'
			/>
			<input
				type='text'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(2, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 2'
			/>
			<input
				type='text'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(3, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 3'
			/>
			<input
				type='text'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(4, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 4'
			/>
			<input
				type='text'
				onChange={(e) =>
					setAnswers((existingAnswer) => {
						existingAnswer.set(5, e.target.value);
						return existingAnswer;
					})
				}
				placeholder='Answer 5'
			/>
			<select
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
			</select>
			<button onClick={onSubmitExam}>
				{selectedExam === null
					? "Create New Exam"
					: "Add Question to " + examName}
			</button>
			<button onClick={onSubmitFetchExams}>
				Download Existing Exams
			</button>
			<div>
				{exams.map((examItem) => (
					<button
						key={examItem.id}
						onClick={() => {
							onClickExistingExam(examItem);
						}}
					>
						{examItem.name}
					</button>
				))}
			</div>
		</div>
	);
};

export default QuestionWriterUI;
