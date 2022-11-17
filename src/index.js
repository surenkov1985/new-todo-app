import "./assets/styles/main.less";

import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./assets/components/App";
import { Provider } from "react-redux";
import { store } from "./assets/stores/store";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./assets/utils/firebaseConfig";
import { getAuth } from "firebase/auth";

const container = document.getElementById("app");
const root = createRoot(container);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const Context = createContext(null);

root.render(
	<Provider store={store}>
		<Context.Provider value={{ app, auth }}>
			<App />
		</Context.Provider>
	</Provider>
);
