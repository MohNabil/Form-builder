import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { formFirestore } from "../../../firebase.config";
import { Link } from "react-router-dom";
import styles from "./Forms.module.css";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles({
	tableContainer: {
		width: "75%",
		margin: "0 auto",
	},
	table: {
		width: "100%",
	},
	tableRow: {
		background: "#e9e8e8",
	},
	icon: {
		marginRight: "5px",
		cursor: "pointer",
	},
});

export const Forms = () => {
	const [rows, setRows] = useState([]);
	const classes = useStyles();
	const deleteForm = (title) => {
		const db = formFirestore;
		db.collection("Forms")
			.doc(`${title}`)
			.delete()
			.then(() => {
				console.log("success to delete Form");
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		const db = formFirestore;
		db.collection("Forms")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach(async (doc) => {
					const result = await doc.data();
					if (result) {
						setRows((prevState) => [...prevState, result]);
					}
				});
			})
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className={styles.container}>
			<TableContainer component={Paper} className={classes.tableContainer}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow className={classes.tableRow}>
							<TableCell align="left">Form Title</TableCell>
							<TableCell align="left">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row, i) => {
							// console.log(row.title);
							return (
								<TableRow key={row.title}>
									<TableCell component="th" scope="row">
										<Link to={{ pathname: `/form/${i + 1}`, state: row }}>
											{`${row.title}`}
										</Link>
									</TableCell>
									<TableCell align="left">
										<Delete
											color="secondary"
											style={{ cursor: "pointer" }}
											onClick={() => deleteForm(row.title)}
										/>
										<Link to={{ pathname: `/edit-form/${i + 1}`, state: row }}>
											<Edit
												color="primary"
												style={{ cursor: "pointer" }}
												fontSize="small"
											/>
										</Link>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
