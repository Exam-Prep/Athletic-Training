/** @format */

import * as React from "react";
import { useState } from "react";
import Checkbox from "../check-box";
import "./styles.css";



export default function App() {
	const [isCheckedA, setIsCheckedA] = useState(false);
	const handleChangeA = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsCheckedA(e.target.checked);
	};

	const [isCheckedB, setIsCheckedB] = useState(false);
	const handleChangeB = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsCheckedB(e.target.checked);
	};

	return (
		<div>
			<h2>Question</h2>

			{/* ------------------------------------------------ */}
			<div className="container">
			<div>
				<Checkbox
					handleChange={handleChangeA}
					isChecked={isCheckedA}
					label='A'
				/>
				Answer1
			</div>
			<div>
				<Checkbox
					handleChange={handleChangeB}
					isChecked={isCheckedB}
					label='B'
				/>
				Answer2
				</div>
			</div>
		</div>
		
	);
}
