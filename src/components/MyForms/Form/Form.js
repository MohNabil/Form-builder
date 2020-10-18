import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { FormInput } from "../../FormInput/FormInput";
import styles from "./Form.module.css";

export const Form = ({ location }) => {
	const data = location.state;
	// console.log(data);

	const inputsState = {};
	useEffect(() => {
		//Initiating an object to hold the data of the form inputs with the label as a key
		data.inputs.forEach((input) => {
			inputsState[`${input.label}`] = "" || input.defaultInputValue;
		});
	}, []);
	const submitHandler = (e) => {
		e.preventDefault();
		console.log(inputsState);
	};
	return (
		<div className={styles.container}>
			<form onSubmit={submitHandler} className={styles.formContainer}>
				<h2 className={styles.title}>{data.title}</h2>
				{data
					? data.inputs.map((input) => (
							<FormInput
								key={input.label}
								type={input.type}
								label={input.label}
								required={input.required}
								defaultValue={input.defaultInputValue}
								stateValue={(value) => (inputsState[`${input.label}`] = value)}
							/>
					  ))
					: null}
				<Button
					variant="contained"
					color="primary"
					type="submit"
					className={styles.submitBtn}
				>
					Submit
				</Button>
			</form>
		</div>
	);
};
