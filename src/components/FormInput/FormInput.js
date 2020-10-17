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
		stateValue(inputValue);
		// console.log("re-render");
	}, [inputValue]);
	return (
		<div className={styles.container}>
			<label>
				{label}
				{required ? "*" : ""}
			</label>
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
		</div>
	);
};
