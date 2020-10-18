import React from "react";
import { Grid } from "@material-ui/core";
import { Builder } from "../Builder/Builder";
import { FormContainer } from "./FormContainer/FormContainer";
import styles from "./Layout.module.css";
import { Switch, Route, Link } from "react-router-dom";
import { Forms } from "../MyForms/Forms/Forms";
import { Form } from "../MyForms/Form/Form";
import { EditBuilder } from "../EditFormBuilder/EditBuilder";

export const Layout = () => {
	return (
		<Grid container className={styles.mainContainer}>
			<Grid item xs={2} className={styles.side}>
				<div className={styles.header}>
					<h1>Form Builder</h1>
				</div>
				<div className={styles.navigation}>
					<Link to="/" className={styles.buildForm}>
						Build Form
					</Link>
					<Link to="/all-forms" className={styles.allForms}>
						My Forms
					</Link>
				</div>
				<div className={styles.info}>
					<h3>Some of the inputs you may want to use</h3>
					<ul>
						<li>text</li>
						<li>number</li>
						<li>email</li>
						<li>password</li>
						<li>date</li>
						<li>checkbox</li>
						<li>textarea</li>
					</ul>
				</div>
			</Grid>
			<Grid item xs={10} className={styles.main}>
				<FormContainer>
					<Switch>
						<Route exact path="/" component={Builder} />
						<Route path="/all-forms" component={Forms} />
						<Route path="/form/:id" component={Form} />
						<Route path="/edit-form/:id" component={EditBuilder} />
					</Switch>
				</FormContainer>
			</Grid>
		</Grid>
	);
};
