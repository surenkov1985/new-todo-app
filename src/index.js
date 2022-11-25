import "./assets/styles/main.less";

import React, { createContext } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./assets/components/App";
import { Provider } from "react-redux";
import { store } from "./assets/stores/store";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./assets/utils/firebaseConfig";

const container = document.getElementById("app");
const root = createRoot(container);

export const Context = createContext({});
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

root.render(
	<Context.Provider value={ {app, auth }}>
		<Provider store={store}>
			<App />
		</Provider>
	</Context.Provider>
);
