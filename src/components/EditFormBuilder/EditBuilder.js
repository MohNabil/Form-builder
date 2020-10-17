import {
	Button,
	Checkbox,
	TextField,
	Dialog,
	DialogTitle,
	DialogActions,
	FormControlLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import { Input } from "../Input/Input";
import styles from "./EditBuilder.module.css";
import { formFirestore } from "../../firebase.config";

export const EditBuilder = ({ location }) => {
	const data = location.state;
	const [formData, setFormData] = useState(data.inputs);
	const [open, setOpen] = useState(false);
	const [checked, setChecked] = useState(false);
	const [label, setLabel] = useState("");
	const [type, setType] = useState("");
	const [defaultInputValue, setDefaultInputValue] = useState("");
	const [msg, setMsg] = useState("");
	const db = formFirestore;
	const openModal = () => {
		setOpen(true);
	};
	const closeModal = () => {
		setOpen(false);
	};
	const requiredCheckBox = (e) => {
		setChecked(e.target.checked);
	};
	const saveInputDetails = () => {
		setFormData((prevState) => [
			...prevState,
			{
				label: label,
				type: type,
				required: checked,
				defaultInputValue: defaultInputValue,
			},
		]);
		closeModal();
		setLabel("");
		setType("");
		setDefaultInputValue("");
		setChecked(false);
	};
	const onSaveHandler = () => {
		db.collection("Forms")
			.doc(`${data.title}`)
			.update({
				inputs: formData,
			})
			.then(() => {
				setMsg("Successfully Updated the form components");
				setTimeout(() => {
					setMsg("");
				}, 1000);
			})
			.catch((err) => {
				setMsg(`${err}`);
			});
	};
	const deleteHandler = (label) => {
		setFormData((prevState) =>
			prevState.filter((item) => item.label !== label)
		);
	};
	return (
		<div className={styles.container}>
			<div className={styles.builderContainer}>
				<h1>Edit your Form Components</h1>
				{formData
					? formData.map((input) => (
							<Input
								key={input.label}
								type={input.type}
								label={input.label}
								required={input.required}
								defaultValue={input.defaultInputValue}
								editDelete={() => deleteHandler(input.label)}
							/>
					  ))
					: null}
				<div className={styles.btnContainer}>
					<Button
						variant="outlined"
						color="default"
						className={styles.addButton}
						onClick={openModal}
					>
						Add Input
					</Button>
					{formData ? (
						<Button
							variant="contained"
							color="primary"
							className={styles.saveButton}
							onClick={onSaveHandler}
						>
							Update
						</Button>
					) : null}
				</div>
				<div>{msg ? <p className={styles.msg}>{msg}</p> : null}</div>
				<Dialog open={open} onClose={closeModal} fullWidth={true}>
					<DialogTitle>Input Details</DialogTitle>
					<TextField
						label="Enter input label"
						variant="filled"
						value={label}
						onChange={(e) => setLabel(e.target.value)}
						className={styles.input}
					/>
					<TextField
						label="Enter input type"
						variant="filled"
						value={type}
						onChange={(e) => setType(e.target.value)}
						className={styles.input}
					/>
					<TextField
						label="Enter input default value"
						variant="filled"
						value={defaultInputValue}
						onChange={(e) => setDefaultInputValue(e.target.value)}
						className={styles.input}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked}
								onChange={requiredCheckBox}
								value="required"
							/>
						}
						label="required"
						className={styles.input}
					/>
					<DialogActions>
						<Button onClick={closeModal} color="secondary">
							Close
						</Button>
						<Button onClick={saveInputDetails} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
};
