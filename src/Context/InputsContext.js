import React, { createContext, useState } from "react";

export const InputsContext = createContext();

export const InputsContextProvider = ({ children }) => {
	const [inputs, setInputs] = useState([]);
	const [formTitle, setFormTitle] = useState("");
	return (
		<InputsContext.Provider
			value={{
				inputs,
				setInputs,
				formTitle,
				setFormTitle,
			}}
		>
			{children}
		</InputsContext.Provider>
	);
};
