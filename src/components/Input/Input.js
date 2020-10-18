import React, { useContext } from "react";
import { InputsContext } from "../../Context/InputsContext";
import styles from "./Input.module.css";
import { Delete } from "@material-ui/icons";

export const Input = ({ type, label, required, defaultValue, editDelete }) => {
	const { setInputs } = useContext(InputsContext);
	const deleteHandler = (label) => {
		if (editDelete) {
			editDelete();
		} else {
			setInputs((prevState) =>
				prevState.filter((item) => item.label !== label)
			);
		}
	};
	return (
		<div className={styles.main}>
			<div className={styles.container}>
				<label>
					{label}
					{required ? "*" : ""}
				</label>
				{type === "input" ? (
					<input
						type={type}
						placeholder={
							defaultValue ? `${defaultValue}` : `Enter your ${label}`
						}
						required={required}
						className={styles.input}
						step={type === "number" ? "0.01" : "1"}
					/>
				) : type === "textarea" ? (
					<textarea
						placeholder={
							defaultValue ? `${defaultValue}` : `Enter your ${label}`
						}
					/>
				) : null}
			</div>
			<div className={styles.btn}>
				<Delete
					color="secondary"
					onClick={() => deleteHandler(label)}
					style={{ cursor: "pointer" }}
				>
					Delete
				</Delete>
			</div>
		</div>
	);
};
