import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { InputsContextProvider } from "./Context/InputsContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
	<Router>
		<InputsContextProvider>
			<App />
		</InputsContextProvider>
	</Router>,
	document.getElementById("root")
);
