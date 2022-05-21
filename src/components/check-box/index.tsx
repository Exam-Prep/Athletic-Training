/** @format */

import React from "react";

interface CheckboxProps {
	isRadio?: boolean; // change to radio if multiple choice
	isChecked: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
	isRadio,
	isChecked,
	handleChange,
	label,
}) => {
	return (
		<div>
			{/* set the checkbox/radio with an id, a boolean for
				if it is chose, and a function to handle change
			*/}
			<input
				type={isRadio ? "radio" : "checkbox"}
				id={label}
				checked={isChecked}
				onChange={handleChange}
			/>
			<label htmlFor={label} style={{ marginLeft: 4 }}>
				{label}
			</label>
		</div>
	);
};
export default Checkbox;
