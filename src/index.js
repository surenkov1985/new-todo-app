import "./assets/styles/main.less";

import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./assets/components/App";
import { Provider } from "react-redux";
import { store } from "./assets/stores/store";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
