import React, { useEffect, useState } from "react";
import styles from "./FormInput.module.css";

export const FormInput = ({
	label,
	required,
	type,
	defaultValue,
	stateValue,
}) => {
	const [inputValue, setInputValue] = useState(defaultValue);
	useEffect(() => {
		//Passing the input value to the function to use it in the parent
		stateValue(inputValue);
	}, [inputValue]);
	return (
		<div className={styles.container}>
			<label>
				{label}
				{required ? "*" : ""}
			</label>
			{type === "input" ? (
				<input
					type={type}
					placeholder={`Enter your ${label}`}
					required={required}
					className={styles.input}
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
						if (type === "checkbox") {
							setInputValue(e.target.checked);
						}
					}}
				/>
			) : type === "textarea" ? (
				<textarea
					value={inputValue}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
					placeholder={`Enter your ${label}`}
				/>
			) : null}
		</div>
	);
};
