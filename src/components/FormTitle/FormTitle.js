import React, { useContext } from "react";
import { TextField } from "@material-ui/core";
import styles from "./FormTitle.module.css";
import { InputsContext } from "../../Context/InputsContext";

export const FormTitle = () => {
	const { formTitle, setFormTitle } = useContext(InputsContext);

	return (
		<div className={styles.container}>
			<TextField
				label="Form Title"
				variant="filled"
				className={styles.titleInput}
				value={formTitle}
				onChange={(e) => setFormTitle(e.target.value)}
			/>
		</div>
	);
};
