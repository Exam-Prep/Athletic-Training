/** @format */

import React from "react";

interface CheckboxProps {
	isChecked: boolean;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
	isChecked,
	handleChange,
	label,
}) => {
	return (
		<div>
			<input
				type='checkbox'
				id={label}
				checked={isChecked}
				onChange={handleChange}
			/>
			<label htmlFor={label}>{label}</label>
		</div>
	);
};
export default Checkbox;
